import React from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Outlet, Navigate } from "react-router-dom";
const PublicRoute = () => {
  const { authstate, setAuthState } = useContext(AuthContext);
  if (authstate === "loading") return <p>Loading...</p>;
  if (authstate === "valid") return <Navigate to="/" replace />;
  return <Outlet />;
};

export default PublicRoute;
