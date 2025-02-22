import FrontEndLayout from "../FrontEndLayout";
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
          path: 'uncleinfo',
          element: <UncleInfoDetailPage/>
        }
      ]
    }
]

export default routes