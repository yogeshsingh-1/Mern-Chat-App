import React from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Outlet, Navigate } from "react-router-dom";
const ProtectRoute = () => {
  const { authstate, setAuthState } = useContext(AuthContext);
  if (authstate === "loading") return <p>Loading...</p>;
  if (authstate === "invalid") return <Navigate to="/auth/signin" replace />;
  return <Outlet />;
};

export default ProtectRoute;
