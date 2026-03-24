import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// initialize routerProvider
import { RouterProvider } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AuthProvider from "./auth/AuthContext";
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={AppRoutes} />
  </AuthProvider>,
);
