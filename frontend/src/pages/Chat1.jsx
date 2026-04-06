import { Button, TextField, Avatar } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Axios from "../utils/axiox.utils";
import { AuthContext } from "../auth/AuthContext";
import getSocket from "../utils/socket.utils";
// const users = [
//   { name: "yogesh", email: "yogesh@gmail.com" },
//   { name: "mohini", email: "mohini@gmail.com" },
//   { name: "ram", email: "ram@gmail.com" },
//   { name: "hari", email: "hari@gmail.com" },
//   { name: "yashi", email: "yashi@gmail.com" },
//   { name: "karan", email: "karan@gmail.com" },
//   { name: "pankaj", email: "pankaj@gmail.com" },
//   //   { name: "jyoti", email: "jyoti@gmail.com" },
// ];
const message = [
  {
    user: "yogesh",
    text: "Hello, how are you?",
  },
  {
    user: "mohini",
    text: "I'm doing well, thank you! How about you?",
  },
  {
    user: "yogesh",
    text: "I'm good too, thanks for asking!",
  },
  { user: "mohini", text: "What are you up to today?" },
  {
    user: "yogesh",
    text: "Not much, just working on some projects. How about you?",
  },
  {
    user: "mohini",
    text: "Same here, just trying to stay productive. Do you have any plans for the weekend?",
  },
  // {
  //   user: "yogesh",
  //   text: "Not yet, but I'm thinking about going hiking. How about you?",
  // },
  // {
  //   user: "mohini",
  //   text: "That sounds like a great idea! I might join you if the weather is nice.",
  // },
  // {
  //   user: "yogesh",
  //   text: "Sure, that would be fun! Let's keep in touch and see how the weather looks closer to the weekend.",
  // },
  // {
  //   user: "mohini",
  //   text: "Sounds good! Looking forward to it.",
  // },
  // { user: "yogesh", text: "I'm excited about it too!" },
  // {
  //   user: "mohini",
  //   text: "That sounds like a great idea! I might join you if the weather is nice.",
  // },
  // {
  //   user: "yogesh",
  //   text: "Sure, that would be fun! Let's keep in touch and see how the weather looks closer to the weekend.",
  // },
  // {
  //   user: "mohini",
  //   text: "Sounds good! Looking forward to it.",
  // },
  // { user: "yogesh", text: "I'm excited about it too!" },
];

const left = "self-start bg-white text-gray-800 rounded-tl-lg";
const right = "self-end bg-emerald-600 text-white rounded-br-lg";
const Chat1 = () => {
  const socket = getSocket();
  const { id } = useContext(AuthContext);
  const [activeId, setActiveId] = useState(null);
  const [input, setInput] = useState("");
  const [text, setText] = useState(false);
  const [search, setSearch] = useState(null);
  // search-user
  const [searchUser, setSearchUser] = useState([]);
  // All selected Users
  const [users, setUsers] = useState([]);
  // chat-users
  const [chatUser, setChatUser] = useState({});
  //  Fetch Users
  const fetchUsers = async (value) => {
    try {
      const { data } = await Axios.post("/api/v1/user", {
        search: value,
      });
      if (data.success) {
        setSearchUser(data.data || []);
        setText(data.data ? false : true);
      } else {
        setSearchUser([]);
      }
    } catch (error) {
      console.error(error);
      setSearchUser([]);
    }
  };
  //  Debounce
  useEffect(() => {
    if (!search) {
      setSearchUser([]);
      return;
    }

    const timer = setTimeout(() => {
      fetchUsers(search);
    }, 800);

    return () => clearTimeout(timer);
  }, [search]);
  // select active chat user
  const selectUser = (user) => {
    // if users null/undefined than we add in users
    users.find((s) => s.id === user.id) ?? setUsers((prev) => [...prev, user]);
    setSearch("");
  };
  const setSeacrhInput = () => {
    console.log(activeId);
    setChatUser((prev) => {
      const prevChat = prev[activeId.id];

      return prevChat
        ? { ...prev, [activeId.id]: [...prevChat, { [activeId.id]: input }] }
        : { ...prev, [activeId.id]: [{ [activeId.id]: input }] };
    });
    socket.emit("send-message", { roomId: activeId.id, msg: input });
    setInput("");
  };
  useEffect(() => {
    socket.on("rec-msg", (data) => {
      setChatUser((prev) => {
        const prevChat = prev[data.roomId];
        return prevChat
          ? {
              ...prev,
              [data.roomId]: [...prevChat, { [data.roomId]: data.msg }],
            }
          : { [data.roomId]: [{ [data.roomId]: data.msg }] };
      });
    });
  });
  return (
    <div className="max-w-[80vw] w-full mx-auto bg-white mt-6 flex h-[80vh] rounded-lg shadow-xl overflow-hidden">
      {/* left */}
      <div className="w-[27%] border-r flex flex-col bg-white">
        {/* left-top */}
        <div className="border-b p-3 ">
          <TextField
            label="Search user..."
            fullWidth
            size="small"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className="flex-1 py-1 px-2 overflow-auto">
            {searchUser.length ? (
              searchUser.map((user, index) => (
                <div
                  className=" rounded-md px-2 py-2  flex items-center gap-2.5 hover:bg-gray-200/50  mt-1 hover:shadow-md duration-100 cursor-pointer"
                  key={index}
                  onClick={() => selectUser(user)}
                >
                  <div className="">
                    <Avatar className="bg-blue-600!">{user.name[0]}</Avatar>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-md font-semibold">{user.name}</h3>
                    <p className="text-xs font-light text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>
              ))
            ) : !search ? (
              <div className="text-sm font-medium text-gray-700 text-center">
                No User Found.
              </div>
            ) : (
              <div className="flex justify-center gap-1 items-center mt-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
              </div>
            )}
          </div>
        </div>
        {/* left-bottom */}
        {users.length ? (
          <div className="flex-1 py-1 px-2 overflow-auto scroll-smooth ">
            {users.length ? (
              users.map((user) => (
                <div
                  className={`rounded-md px-2 py-2  flex items-center gap-2.5 hover:bg-gray-200/50  mt-1 hover:shadow-md  cursor-pointer ${user.isActive ? "bg-gray-200/50" : null}`}
                  key={user.id}
                  onClick={() => {
                    setUsers((prev) =>
                      prev.map((u) =>
                        u.id === user.id
                          ? { ...u, isActive: true }
                          : { ...u, isActive: false },
                      ),
                    );
                    setActiveId(user);
                    socket.emit("join-room", user.id);
                  }}
                >
                  <div className="">
                    <Avatar className="bg-blue-600!">{user.name[0]}</Avatar>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-md font-semibold">{user.name}</h3>
                    <p className="text-xs font-light text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm font-medium text-gray-700 text-center">
                No User Found.
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-sm font-medium mt-3">
            No Selected User.
          </div>
        )}
      </div>
      {/* right */}
      <div className="flex-1 flex flex-col justify-between ">
        {/* right-top */}
        {activeId && (
          <div className="border-b py-3 px-3 flex items-center gap-3">
            <Avatar className="size-8!">{activeId.name[0]}</Avatar>
            <h3 className="text-md font-semibold">{activeId.name}</h3>
          </div>
        )}
        {/* right-center */}
        {activeId ? (
          <div className="flex-1 px-4 py-2 flex flex-col gap-1.5 overflow-auto">
            {chatUser[activeId.id]
              ? chatUser[activeId.id].map((msg, index) => {
                  return (
                    <div
                      className={`py-2.5 px-2 text-xs font-medium  border  ${msg.id === id ? left : right}`}
                      key={index}
                    >
                      {msg.id === id ? msg[id] : msg[activeId.id]}
                    </div>
                  );
                })
              : ""}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-zinc-400">
            <p className="text-lg">👋 Welcome</p>
            <p className="text-sm">
              Search and select a user to start chatting
            </p>
          </div>
        )}

        {/* right-bottom */}
        {activeId && (
          <div className="px-4 py-2 border-t  ">
            <div className="flex gap-4">
              <TextField
                fullWidth
                label="message"
                type="text"
                size="small"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                required
              />
              <Button
                variant="contained"
                type="submit"
                onClick={setSeacrhInput}
              >
                Send
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat1;
