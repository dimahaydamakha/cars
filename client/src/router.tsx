import { createBrowserRouter } from "react-router";
import App from "../pages/Find";
import Home from "../pages/Home";
import View from "../pages/View";

const router = createBrowserRouter(
    [{path: "/",
      element: <Home/>},
    {
      path: "/home",
      element: <Home/>,
    },
    {
      path: "/find_car",
      element: <App/>,
    },
    {
      path: "/view_car",
      element: <View/>,
    },]);


export default router;
  