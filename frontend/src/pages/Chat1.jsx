import { Button, TextField, Avatar } from "@mui/material";
import { useContext, useEffect, useState, useRef } from "react";
import Axios from "../utils/axiox.utils";
import { AuthContext } from "../auth/AuthContext";
import getSocket from "../utils/socket.utils";

// roomId is commbination of userA and userB
function getRoomId(userA, userB) {
  return [userA.toString(), userB.toString()].sort().join("_");
}
const left = "self-start bg-white text-gray-800 rounded-tl-lg";
const right = "self-end bg-emerald-600 text-white rounded-br-lg";
const socket = getSocket();

const Chat1 = () => {
  const { id } = useContext(AuthContext);
  const [activeId, setActiveId] = useState(null);
  const [input, setInput] = useState("");
  const [text, setText] = useState(false);
  const [search, setSearch] = useState("");
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
    const roomId = getRoomId(id, user.id);
    socket.emit("join-room", roomId);

    users.find((s) => s.id === user.id) ?? setUsers((prev) => [...prev, user]);
    // setActiveId(user);
    setSearch("");
  };
  // event for send msg
  const handleSendMessage = () => {
    if (!input.trim() || !activeId) return;

    const roomId = getRoomId(id, activeId.id);
    // emit to server
    socket.emit("send-message", {
      roomId,
      senderId: id,
      msg: input.trim(),
      time: new Date().toTimeString().split(" ")[0],
    });

    // 2. clear input
    setInput("");
  };
  // event for rec msg
  // server controlled
  useEffect(() => {
    const handler = (data) => {
      setChatUser((prev) => {
        const prevChat = prev[data.roomId];

        return {
          ...prev,
          [data.roomId]: prevChat
            ? [
                ...prevChat,
                {
                  from: data.senderId,
                  msg: data.msg,
                  time: new Date().toTimeString().split(" ")[0],
                },
              ]
            : [
                {
                  from: data.senderId,
                  msg: data.msg,
                  time: new Date().toTimeString().split(" ")[0],
                },
              ],
        };
      });
    };
    socket.on("rec-msg", handler);
    // socket.on("typing", (data) => {});
    return () => {
      socket.off("rec-msg", handler);
    };
  }, []);
  // useEffect(() => {
  // socket.emit("join-room", id);
  // disconnected logic for room
  //   return;
  // }, []);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatUser]);
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
              searchUser.map((user) => (
                <div
                  className=" rounded-md px-2 py-2  flex items-center gap-2.5 hover:bg-gray-200/50  mt-1 hover:shadow-md duration-100 cursor-pointer"
                  key={user.id}
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
                  className={`rounded-md px-2 py-2  flex items-center gap-2.5 hover:bg-gray-200/50  mt-1 hover:shadow-md  cursor-pointer ${
                    user.isActive ? "bg-gray-200/50" : null
                  }`}
                  key={user.id}
                  onClick={() => {
                    setUsers((prev) =>
                      prev.map((u) =>
                        u.id === user.id
                          ? { ...u, isActive: true }
                          : { ...u, isActive: false }
                      )
                    );
                    setActiveId(user);
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
            <h3 className="text-md font-semibold">
              {activeId.name}-{activeId.id}
            </h3>
          </div>
        )}
        {/* right-center */}
        {activeId ? (
          <div className="flex-1 px-4 py-2 flex flex-col gap-1.5 overflow-auto">
            {chatUser[getRoomId(id, activeId.id)] &&
              chatUser[getRoomId(id, activeId.id)].map((msg, index) => {
                return (
                  <div
                    className={`max-w-[60%] w-fit py-1 px-2  border flex gap-3 shadow-2xl ${
                      msg.from === id ? right : left
                    }`}
                    key={index}
                  >
                    <div className=" text-sm ">{msg.msg}</div>
                    <div className="text-[8px] text-gray-600 self-end font-medium">
                      {msg.time}
                    </div>
                  </div>
                );
              })}
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
                onChange={(e) => {
                  setInput(e.target.value);
                  // socket.emit("typing", {
                  //   roomId: getRoomId(id, activeId.id),
                  //   recId: activeId.id,
                  // });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
                required
              />
              <Button
                variant="contained"
                type="submit"
                onClick={handleSendMessage}
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
