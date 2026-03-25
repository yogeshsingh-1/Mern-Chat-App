import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import DashboardMenu from "./DashboardMenu";
const Navbar = () => {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  return (
    <div className="h-[10vh]  grid grid-cols-2 shadow-md sticky top-0  justify-center items-center bg-white">
      {/* leftbar */}
      <div className=" flex items-center px-10 gap-4">
        <div className="text-green-600 ">
          <i className="ri-chat-ai-line text-2xl font-medium"></i>
        </div>
        <div
          className="text-xl tracking-wider font-semibold text-gray-800 cursor-pointer"
          onClick={() => navigate("/")}
        >
          PingChat
        </div>
      </div>

      {/* <i className="ri-menu-line"></i>
   {/* rightbar */}
      {authState === "valid" ? (
        <div className="flex justify-end gap-10 items-center px-10">
          <div className="flex items-center gap-1.5 ">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <div className="text-[12.5px] font-semibold text-green-600">
              Online
            </div>
          </div>
          <div className="h-9.5 w-[0.1vw] bg-gray-300"></div>
          <div className="text-zinc-700 font-medium text-xl">
            <i className="ri-search-line"></i>
          </div>
          <div className="mx-0!">
            <DashboardMenu />
          </div>
        </div>
      ) : (
        <div className="flex justify-end px-10">
          <Button
            variant="outlined"
            onClick={() => navigate("/auth")}
            className="px-6! border-green-600! text-green-600!"
          >
            Login
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
