import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Cookies from 'js-cookie';
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CartPage() {
  const [cart, setCart] = useState({});
  const [cookieData, setCookieData] = useState(null);
  const navigate = useNavigate();

  const getCart = async () => {
    try {
      if (Cookies.get("tickList")) {
        const tickListAry = JSON.parse(Cookies.get("tickList")).map((item) => JSON.parse(item));
        setCookieData(tickListAry);
      }
      const res = await axios.get(`${BASE_URL}/api/${API_PATH}/cart`);
      setCart(res.data.data);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert('取得購物車列表失敗');
    }
  }

  useEffect(() => {
    getCart();
  }, [])

  const removeCartItem = async (cartItem_id, cartItem_product_id) => {
    // setIsScreenLoading(true);
    try {
      if (Cookies.get("tickList")) {
        await axios.delete(`${BASE_URL}/api/${API_PATH}/cart/${cartItem_id}`);
        const tickListAry = JSON.parse(Cookies.get("tickList")).map((item) => JSON.parse(item));
        const newTickListAry = tickListAry.filter((item) => {
          return (item.product_id !== cartItem_product_id)
        });

        if (newTickListAry.length === 0) {
          Cookies.remove("tickList");
        } else {
          const jsonCookieData = JSON.stringify(newTickListAry.map((item) => JSON.stringify(item)));
          Cookies.set("tickList", jsonCookieData, { expires: 1 });
        }
        getCart();
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert('刪除購物車品項失敗');
    } finally {
      // setIsScreenLoading(false);
    }
  }
  
  return (
    <>
    {cart.carts?.length ? 
    (<div className="container">
      <h1>購物車</h1>
      <table className="table align-middle" style={{ tableLayout: "fixed", width: "100%" }}>
        <thead>
          <tr>
            <th>大叔圖片</th>
            <th>大叔稱呼</th>
            <th>購買內容</th>
            <th>數量</th>
            <th>費用</th>
            <th>刪除</th>
          </tr>
        </thead>
        <tbody>
          {cart.carts.map((cartItem, index) => {
            return (
            <tr key={cartItem.id}>
              <td><img className='cart-image' src={cartItem.product.imageUrl} alt="圖片" /></td>
              <td>{cartItem.product.title}</td>
              <td>{cookieData[index]?.ticket}</td>
              <td>{`X${cookieData[index]?.qty}`}</td>
              <td>{`NT.${cartItem.total}`}</td>
              <td><button type="button" className="btn btn-outline-danger btn-sm" onClick={() => removeCartItem(cartItem.id, cartItem.product_id)}>X</button></td>
            </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="6">
              <div className="d-flex justify-content-between">
                <button className="shipping-button" onClick={() => navigate('/uncleinfos')}>繼續購物</button>
                <button className="order-button">結帳</button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>) : <div className="container"><h1>無購物清單資料</h1></div>
    }
  </>
  )
}