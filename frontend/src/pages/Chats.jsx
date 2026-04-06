import React, { useEffect, useState, useContext } from "react";
import Axios from "../utils/axiox.utils";
import { TextField, InputAdornment } from "@mui/material";
import Search from "@mui/icons-material/Search";
import ChatBar from "../components/ChatBar";
import SingleChat from "./SingleChat";
import getSocket from "../utils/socket.utils";
import { AuthContext } from "../auth/AuthContext";
// const chats = {
//   user2: [
//     { from: "me", message: "Hello 😄" },
//     { from: "user2", message: "Hi bhai" },
//   ],
//   user3: [{ from: "user3", message: "Hey!" }],
// };
const Chats = () => {
  const { id } = useContext(AuthContext);
  const socket = getSocket();
  const [search, setSearch] = useState("");
  // all users from search
  const [users, setUsers] = useState([]);
  // selected user for chat
  const [selectedUser, setSelectedUser] = useState([]);
  // all chats
  const [chats, setChats] = useState({});
  // current chat user id
  const [currentChatId, setCurrentId] = useState(null);
  // const [chatUser, setChatUser] = useState(null);
  //  Fetch Users
  const fetchUsers = async (value) => {
    try {
      const { data } = await Axios.post("/api/v1/user", {
        search: value,
      });
      if (data.success) {
        setUsers(data.data || []);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error(error);
      setUsers([]);
    }
  };
  // console.log(selectedUser);
  //  Debounce
  useEffect(() => {
    if (!search) {
      setUsers([]);
      return;
    }

    const timer = setTimeout(() => {
      fetchUsers(search);
    }, 800);

    return () => clearTimeout(timer);
  }, [search]);
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      console.log("New message:", data);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);
  //  Add selected user
  const createSelectedUser = (user) => {
    const exist = selectedUser.find((u) => u.id === user.id);
    if (!exist) {
      setSelectedUser((prev) => [...prev, user]);
      setChats((prev) => ({ ...prev, [user.id]: [] }));
    }
    setUsers([]);
    setSearch("");
  };
  console.log(chats);
  // set Current Chat user
  // const setChatsForUser = (id) => {
  //   // setChatUser(selectedUser.find((u) => u.id === id));
  //   setChats((prev) => ({ ...prev, [id]: prev[id] || [] }));
  // };
  // console.log("hi", chats[currentChatId].length);
  return (
    <div className="max-w-6xl w-full mx-auto my-6 shadow-2xl rounded-2xl bg-white h-[80vh] flex overflow-hidden border">
      {/*  Sidebar */}
      <div className="w-[30%] bg-gradient-to-b from-zinc-50 to-zinc-100 border-r flex flex-col">
        {/* Header */}
        <div className="p-4 font-semibold text-lg border-b bg-white">
          Messages
        </div>

        {/*  Search */}
        <div className="p-3">
          <TextField
            placeholder="Search users..."
            size="small"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="text-zinc-400" />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "10px",
            }}
          />
        </div>

        {/*  Search Results */}
        {search && (
          <div className="px-2 space-y-1 max-h-40 overflow-y-auto">
            {users.length ? (
              users.map((user) => (
                <div
                  key={user.id}
                  onClick={() => createSelectedUser(user)}
                  className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-blue-100 transition"
                >
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  {/* Info */}
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-center text-gray-400">
                No users found
              </p>
            )}
          </div>
        )}

        {/* Selected Users */}
        <div className="flex-1 overflow-y-auto mt-3 px-2">
          <p className="text-xs text-gray-500 px-2 mb-2">Selected Chats</p>

          {selectedUser.length ? (
            selectedUser.map((user) => (
              <div
                onClick={() => setCurrentId(user.id)}
                key={user.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-200 cursor-pointer transition"
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-center text-gray-400 mt-4">
              No chats yet
            </p>
          )}
        </div>
      </div>

      {/*  Chat Area */}
      <div className="flex-1 flex flex-col bg-zinc-50">
        {chats[currentChatId] ? (
          <SingleChat
            selectedUser={selectedUser.find((u) => u.id === currentChatId)}
            chatData={chats[currentChatId]}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-zinc-400">
            <p className="text-lg">👋 Welcome</p>
            <p className="text-sm">
              Search and select a user to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;
