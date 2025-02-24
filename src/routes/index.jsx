import FrontEndLayout from "../FrontEndLayout";
import CartPage from "../Pages/CartPage";
import HomePage from "../Pages/HomePage";
import UncleInfoDetailPage from "../Pages/UncleInfoDetailPage";
import UncleInfoPage from "../Pages/UncleInfoPage";

const routes = [
    {
      path: '/',
      element: <FrontEndLayout/>,
      children: [
        {
          path: '',
          element: <HomePage/>
        },
        {
          path: 'uncleinfos',
          element: <UncleInfoPage/>
        },
        {
          path: 'uncleinfo/:id',
          element: <UncleInfoDetailPage/>
        }
        ,
        {
          path: 'carts',
          element: <CartPage/>
        }
      ]
    }
]

export default routes