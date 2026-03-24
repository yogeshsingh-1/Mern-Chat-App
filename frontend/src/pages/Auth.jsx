import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Login, Signup } from "../pages";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname.includes("signup") ? "signup" : "login";

  const activeStyle =
    "font-semibold h-9 bg-white text-blue-500 border border-transparent";
  const inActiveStyle = "h-9 border";

  return (
    <div className="max-w-sm w-full mt-10 text-white shadow-md rounded overflow-hidden mx-auto">
      {/* Tabs */}
      <div className="px-5 py-2 grid grid-cols-2 bg-blue-500">
        <button
          className={activeTab === "login" ? activeStyle : inActiveStyle}
          onClick={() => navigate("/auth/login")}
        >
          Login
        </button>

        <button
          className={activeTab === "signup" ? activeStyle : inActiveStyle}
          onClick={() => navigate("/auth/signup")}
        >
          Sign Up
        </button>
      </div>

      {/* Sliding Forms */}
      <div className="relative overflow-hidden h-72">
        <div
          className={`flex w-[200%] transition-transform duration-500 ease-in-out
          ${activeTab === "login" ? "translate-x-0" : "-translate-x-1/2"}`}
        >
          <div className="w-1/2 py-8 px-10">
            <Login />
          </div>

          <div className="w-1/2 py-8 px-10">
            <Signup />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
