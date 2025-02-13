import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      // setIsScreenLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/api/${API_PATH}/products`);
        setProducts(res.data.products);
        // console.log(res.data.products);
      } catch (error) {
        alert("取得產品失敗");
      } finally {
        // setIsScreenLoading(false);
      }
    };
    getProducts();
  }, []);

  return (
  <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">大叔出任務</a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">大叔接招</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">精選文章</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">購物車</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">登入</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div className="container mt-5">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((product) => {
          return (
            <div key={product.id} className="col">
              <div className="card d-flex flex-column h-60">
                <img src={product.imageUrl} className="card-img-top" alt={product.title} style={{height:'300px'}} />
                <div className="card-body d-flex flex-column flex-grow-1">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.content.slice(0, 50) + "..."}</p>
                  <a href="#" className="btn btn-primary">了解更多</a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  </>
  )
}

export default App
