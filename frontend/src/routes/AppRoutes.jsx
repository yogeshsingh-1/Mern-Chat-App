import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home, Login, Signup, Chats } from "../pages/index";
import Auth from "../pages/Auth";
import ProtectRoute from "../auth/ProtectRoute";
import PublicRoute from "../auth/PublicRoute";
const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectRoute>
        <App />
      </ProtectRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      ,
      {
        path: "chat",
        element: <Chats />,
      },
    ],
  },
  {
    path: "/auth/login",
    element: (
      <PublicRoute>
        <Auth />
      </PublicRoute>
    ),
    // children: [
    //   {
    //     path: "login",
    //     element: <Login />,
    //   },
    //   {
    //     path: "signup",
    //     element: <Signup />,
    //   },
    // ],
  },
  {
    path: "/auth/signup",
    element: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    ),
  },
  {
    path: "*",
    element: <h1>Page Not Found!</h1>,
  },
]);

export default AppRoutes;
