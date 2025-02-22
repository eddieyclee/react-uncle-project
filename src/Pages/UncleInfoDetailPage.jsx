import { useEffect, useState } from 'react'
import { useParams } from "react-router";
import axios from 'axios';
import '../style.css'

const photoAddressData = 
  [
    "https://plus.unsplash.com/premium_photo-1664541337092-81ad747fc1f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVvcGxlfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
  ]

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function UncleInfoDetailPage() {
  const [product, setProduct] = useState({});
  const [subPhotoAddress, setSubPhotoAddress] = useState('');
  const { id: product_id } = useParams(); //重新命名為product_id
  
  const handlePhotoAddress = (el) => {
    setSubPhotoAddress(el.target.currentSrc);
  };

  useEffect(() => {
    const getProducts = async () => {
      // setIsScreenLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/api/${API_PATH}/product/${product_id}`);
        setProduct(res.data.product);
        setSubPhotoAddress(res.data.product.imageUrl);
        console.log(res.data.product);
      } catch (error) {
        alert(error);
      } finally {
        // setIsScreenLoading(false);
      }
    };
    getProducts();
  }, []);

  return (
    <>
      <div className="container">
        <div className="uncle-photo">
            <div className='section-1'>
              <img className="image" src={subPhotoAddress} alt="產品圖片" />
            </div>
            <div className='section-2'>
              <div className="thumbnails">
                <img src={product.imageUrl} alt="縮圖1" style={
                {
                  border: "2px solid",
                  borderColor: photoAddressData[0] === subPhotoAddress ? "#73DB6A" : "transparent"
                }
                } onClick={handlePhotoAddress}/>
                <img src={photoAddressData[1]} alt="縮圖2" style={
                {
                  border: "2px solid",
                  borderColor: photoAddressData[1] === subPhotoAddress ? "#73DB6A" : "transparent"
                }
                } onClick={handlePhotoAddress}/>
                <img src={photoAddressData[2]} alt="縮圖3" style={
                {
                  border: "2px solid",
                  borderColor: photoAddressData[2] === subPhotoAddress ? "#73DB6A" : "transparent"
                }
                } onClick={handlePhotoAddress}/>
                <img src={photoAddressData[3]} alt="縮圖4" style={
                {
                  border: "2px solid",
                  borderColor: photoAddressData[3] === subPhotoAddress ? "#73DB6A" : "transparent"
                }
                } onClick={handlePhotoAddress}/>
              </div>
            </div>
            <div className='section-3'>
              <div className='sub-content'>
                <label className='info' htmlFor="">大叔介紹</label>
                <p className='info'>擁有 20 年以上人生閱歷，溫柔耐心，善於與人溝通，最喜歡幫助他人繁决問題。無論是陪伴長者、協助機務，還是成為成為談心的對象，都會以專業和細心滿足您的需求。</p>
              </div>
              <div className='sub-content'>
                <label className='spec-info' htmlFor="">產品規格介紹</label>
                <p className='info'>全部規格包含：一小時券、而小時券、三小時券、半日券、全日券、三日券，半日券的服務時長最長不超過 4 小時，全日券之服務時長不超過 8 小時，三日券的使用方式，請與大叔約定使用之日期，每個日期提供等同一日券服務，服務時長不超過 8 小時。</p>
              </div>
              <div className='sub-content'>
                <label className='info' htmlFor="">服務聲明</label>
                <p className='service-info'>大叔提供合法、安全的協助服務,內容依平台規範進行，非專業需求請謹慎選擇。服務過程如因不可抗力造成問題，平台將協助處理，但不負最終責任。</p>
              </div>
            </div>
        </div>
        <div className="uncle-info">
          <div className="uncle-details">
            <div><label className='name'>{product.title}</label></div>
            <div className='sub-title-content'>
              <label className='title'>所在地</label>
              <label className='content'>{`category:${product.category}`}</label>
            </div>
            <div className='sub-title-content'>
              <label className='title'>使用語言</label>
              <label className='content'>{`content:${product.content}`}</label>
            </div>
            <div className='sub-title-content'>
              <label className='title'>專長</label>
              <span className="tag">{`des:${product.description}`}</span>
              <span className="tag">{`des:${product.description}`}</span>
              <span className="tag">{`des:${product.description}`}</span>
              <span className="tag">{`des:${product.description}`}</span>
              <span className="tag">{`des:${product.description}`}</span>
            </div>
            <div className="row">
              <div className="col-6">
                <label className='title'>規格<span style={{color: 'red'}}>*</span></label>
                <select className='mt-1'>
                  <option>請選擇</option>
                </select>
              </div>
              <div className="col-6">
                <label className='title'>數量</label>
                <div className="quantity-container mt-1">
                  <button className="quantity-button-l" disabled>-</button>
                  <input type="text" className="quantity-input" defaultValue="1" />
                  <button className="quantity-button-r">+</button>
                </div>
              </div>
            </div>
            <div className='uncle-price'>
              <div className='sub-title-content'>
                <label className='title'>價格</label>
                <label className='content-price'>{`NT${product.price}`}</label>
              </div>
            </div>
            <div className='uncle-button'>
              <button className='cart-button'>加入購物車</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}