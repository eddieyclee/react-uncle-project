import { NavLink } from 'react-router';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* Navbar Brand */}
      <NavLink className="navbar-brand" to="/">大叔出任務</NavLink>

      {/* Toggler 按鈕（小螢幕時顯示） */}
      <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarSupportedContent" 
        aria-controls="navbarSupportedContent" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* 折疊內容 */}
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to="/uncleinfos">大叔接招</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/">精選文章</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/">購物車</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/">登入</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}