import FrontEndLayout from "../FrontEndLayout";
import UncleIntro from "../Pages/uncleIntro";

const routes = [
    {
      path: '/',
      element: <FrontEndLayout/>,
      children: [
        {
         path: 'uncleIntro',
         element: <UncleIntro/>
        }
      ]
    }
]

export default routes