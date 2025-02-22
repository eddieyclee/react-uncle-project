import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router';
import Navbar from './components/Navbar'; 

export default function FrontEndLayout() {
  return (
  <>
    <Navbar/>
    <Outlet/>
  </>
  )
}