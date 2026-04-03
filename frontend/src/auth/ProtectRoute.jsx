import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Outlet, Navigate } from "react-router-dom";
const ProtectRoute = () => {
  // debugger;
  const { authState, setAuthState } = useContext(AuthContext);
  if (authState === "loading") return <p>Loading...</p>;
  if (authState === "invalid") return <Navigate to="/auth" replace />;
  return <Outlet />;
};

export default ProtectRoute;
