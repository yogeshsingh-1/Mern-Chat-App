import React, { useEffect, useState } from "react";
import Axios from "../utils/axiox.utils";
import Chat from "../components/Chat";
const data = [
  {
    name: "yogesh singh",
    email: "yogeshs368@gmail.com",
  },
  { name: "yogesh singh", email: "jai.gupta@gmail.com" },
  { name: "yogesh singh", email: "nitin@gmail.com" },
  { name: "yogesh singh", email: "abbas@gmail.com" },
  { name: "yogesh singh", email: "ravi@gmail.com" },
  { name: "yogesh singh", email: "kartika@gmail.com" },
];
const Chats = () => {
  const [view, setView] = useState(true);
  const [users, setUsers] = useState(data);
  const allUsers = async () => {
    try {
      const { data } = await Axios.get("/api/v1/user/all");
      console.log(data);
      if (data.success) {
        setView(false);
        // setUsers(data?.data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };
  useEffect(() => {
    allUsers();
  }, []);
  if (view) {
    return <p>Loading...</p>;
  }
  // return <div>{JSON.stringify(user)}</div>;
  return (
    <div className="max-w-5xl w-full mx-auto my-5 shadow-md rounded-md bg-white min-h-[80vh] p-4 flex gap-3  ">
      <div className="w-[30%] bg-zinc-400 rounded-md p-3 flex flex-col gap-3 ">
        {users.map((user) => (
          <Chat user={user}/>
        ))}
      </div>
      <div className="flex-1 bg-red-300 rounded-md">hi</div>
    </div>
  );
};

export default Chats;
