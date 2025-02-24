import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CartPage() {
  const [cart, setCart] = useState({});
  const [cookieData, setCookieData] = useState(null);

  useEffect(() => {
    const getCart = async () => {
      try {
        if (Cookies.get("tickList")) {
          const tickListAry = JSON.parse(Cookies.get("tickList")).map((item) => JSON.parse(item));
          const res = await axios.get(`${BASE_URL}/api/${API_PATH}/cart`);
          setCookieData(tickListAry);
          setCart(res.data.data);
        }
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        alert('取得購物車列表失敗');
      }
    }
    getCart();
  }, [])
  
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
          <td><button type="button" className="btn btn-outline-danger btn-sm">x</button></td>
          <td>{cartItem.product.title}</td>
          <td>{cookieData && cookieData[index].ticket}</td>
          <td>{cookieData && cookieData[index].qty}</td>
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