import { Outlet } from "react-router-dom";
import Auth from "../pages/Auth";
const AuthLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
