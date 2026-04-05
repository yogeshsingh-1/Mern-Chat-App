import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Signup, Chats } from "../pages/index";
import Auth from "../pages/Auth";
import ProtectRoute from "../auth/ProtectRoute";
import PublicRoute from "../auth/PublicRoute";
import MainLayout from "../layout/MainLayout";
import SingleChat from "../pages/SingleChat";
import AuthLayout from "../layout/AuthLayout";
import ErrorBoundary from "../components/ErrorBoundary";
import ChatLayout from "../layout/ChatLayout";
import Chat1 from "../pages/Chat1";
const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "chat",
        element: <ProtectRoute />,
        children: [
          {
            element: <ChatLayout />,
            children: [
              // { index: true, element: <Chats /> },
              { index: true, element: <Chat1 /> },
              { path: ":id", element: <SingleChat /> },
            ],
          },
        ],
      },
      {
        path: "auth",
        element: <PublicRoute />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              { index: true, element: <Auth /> },
              { path: "signup", element: <Auth /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <h1>Page Not Found!</h1>,
  },
]);
export default AppRoutes;
