import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CartPage() {
  const [cart, setCart] = useState({});
  const [cookieData, setCookieData] = useState(null);

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
      await axios.delete(`${BASE_URL}/api/${API_PATH}/cart/${cartItem_id}`);
      if (Cookies.get("tickList")) {
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
    <table className="table align-middle">
      <thead>
      <tr>
        <th></th>
        <th>名稱</th>
        <th>規格</th>
        <th style={{ width: "150px" }}>數量/單位</th>
        <th className="text-end">單價</th>
      </tr>
      </thead>
      <tbody>
      {cart.carts?.map((cartItem, index) => {
        return (
        <tr key={cartItem.id}>
          <td><button type="button" className="btn btn-outline-danger btn-sm" onClick={() => removeCartItem(cartItem.id, cartItem.product_id)}>X</button></td>
          <td>{cartItem.product.title}</td>
          <td>{cookieData && cookieData[index]?.ticket}</td>
          <td>{cookieData && `X${cookieData[index]?.qty}`}</td>
          <td className="text-end">{cartItem.total}</td>
        </tr>
        )
      })}
      </tbody>
      <tfoot>
      <tr>
        <td colSpan="4" className="text-end">總計：</td>
        <td className="text-end" style={{ width: "130px" }}>{cart.total}</td>
      </tr>
      </tfoot>
    </table>
  </>
  )
}