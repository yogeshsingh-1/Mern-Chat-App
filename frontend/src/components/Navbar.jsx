import React from "react";
import Avatar from "@mui/material/Avatar";

const Navbar = () => {
  return (
    <div className="h-[10vh]  grid grid-cols-2 shadow-md sticky top-0  justify-center items-center ">
      {/* leftbar */}
      <div className=" flex items-center px-10 gap-4">
        <div className="text-green-600 ">
          <i className="ri-chat-ai-line text-2xl font-medium"></i>
        </div>
        <div className="text-xl tracking-wider font-semibold text-gray-800">
          PingChat
        </div>
      </div>
   

      {/* <i className="ri-menu-line"></i>
   {/* rightbar */}
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

        <div>
          <Avatar src="/broken-image.jpg" className="w-7! h-7!" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
