import { Avatar } from "@mui/material";
const Chat = ({ user }) => {
  return (
    <div className="bg-white rounded-md px-4 py-2 flex gap-3 items-center ">
      <Avatar className="size-8!" />
      <div className="flex-1 bg-zinc-200">
        <h4 className="text-sm font-medium capitalize ">{user.name}</h4>
        <h6 className="text-[0.6rem] font-medium capitalize ">{user.email}</h6>
      </div>
    </div>
  );
};

export default Chat;
