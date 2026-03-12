import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home, Login, Signup, Chats } from "../pages/index";
import Auth from "../pages/Auth";
const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "auth",
        element: <Auth />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
        ],
      },
      {
        path: "chat/:id",
        element: <Chats />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>Page Not Found!</h1>,
  },
]);

export default AppRoutes;
