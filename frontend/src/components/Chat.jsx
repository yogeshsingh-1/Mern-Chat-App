import { Avatar } from "@mui/material";
const Chat = ({ user }) => {
  return (
    <div className="bg-gray-100 px-4 py-3 flex gap-3 items-center justify-between shadow-md">
      <Avatar className="size-8!" />
      <div className="flex-1">
        <h4 className="text-xs font-medium capitalize text-black/70 ">
          {user.name}
        </h4>
        <h6 className="text-[0.5rem] font-medium capitalize text-zinc-400">
          {user.email}
        </h6>
      </div>
    </div>
  );
};

export default Chat;
