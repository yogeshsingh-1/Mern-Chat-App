import React, { useEffect, useState, useMemo } from "react";
import Axios from "../utils/axiox.utils";
import Chat from "../components/Chat";
import { TextField, InputAdornment } from "@mui/material";
import Search from "@mui/icons-material/Search";
import ChatBar from "../components/ChatBar";

const Chats = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const { data } = await Axios.get("/api/v1/user/all");
      if (data.success) {
        setUsers(data.data || []);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, users]);

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center text-zinc-500">
        Loading chats...
      </div>
    );
  }

  return (
    <div className="max-w-6xl w-full mx-auto my-6 shadow-2xl rounded-2xl bg-white h-[80vh] flex overflow-hidden border ">
      {/* 🔥 Sidebar */}
      <div className="w-[30%] bg-gradient-to-b from-zinc-50 to-zinc-100 border-r flex flex-col">
        {/* Header */}
        <div className="p-4 font-semibold text-lg border-b bg-white">
          Messages
        </div>

        {/* 🔍 Search */}
        <div className="p-3">
          <TextField
            placeholder="Search conversations..."
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
              "& input": { fontSize: "14px" },
            }}
          />
        </div>

        {/*  User List */}
        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <div
                key={index}
                onClick={() => setSelectedUser(user)}
                className={`group flex items-center gap-3 cursor-pointer rounded-xl px-3 py-2 transition-all duration-200
                  ${
                    selectedUser?.email === user.email
                      ? "bg-blue-500 text-white shadow-md"
                      : "hover:bg-zinc-200"
                  }`}
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-semibold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs opacity-70 truncate">{user.email}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-center text-zinc-400 mt-5">
              No users found
            </p>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-zinc-50">
        {selectedUser ? (
          <ChatBar selectedUser={selectedUser} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-zinc-400">
            <p className="text-lg">👋 Welcome</p>
            <p className="text-sm">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;



// import { useEffect, useRef, useState } from "react";

// const ChatBar = ({ selectedUser }) => {
//   const [messages, setMessages] = useState([
//     { text: "Hi Yogesh", sender: "me", time: "10:00 AM" },
//     { text: "Hello Jai", sender: "other", time: "10:01 AM" },
//   ]);

//   const [input, setInput] = useState("");
//   const bottomRef = useRef(null);

//   // 🔥 Auto scroll to latest message
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const getTime = () => {
//     return new Date().toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const handleSend = () => {
//     if (!input.trim()) return;

//     setMessages((prev) => [
//       ...prev,
//       { text: input, sender: "me", time: getTime() },
//     ]);
//     setInput("");
//   };

//   // ⌨️ Enter to send
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") handleSend();
//   };

//   return (
//     <div className="flex flex-col w-full h-full bg-zinc-100 overflow-hidden">
//       {/* Header */}
//       <div className="p-3 border-b bg-white font-semibold shrink-0">
//         {selectedUser?.name || "Chat"}
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex ${
//               msg.sender === "me" ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div className="flex flex-col max-w-xs">
//               <div
//                 className={`px-4 py-2 rounded-2xl text-sm ${
//                   msg.sender === "me"
//                     ? "bg-blue-500 text-white rounded-br-none"
//                     : "bg-white text-black rounded-bl-none"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//               <span className="text-[10px] text-zinc-400 mt-1 px-1">
//                 {msg.time}
//               </span>
//             </div>
//           </div>
//         ))}

//         <div ref={bottomRef} />
//       </div>

//       {/* Input */}
//       <div className="p-3 border-t bg-white flex items-center gap-2 shrink-0">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//           placeholder="Type a message..."
//           className="flex-1 border rounded-full px-4 py-2 text-sm outline-none"
//         />
//         <button
//           onClick={handleSend}
//           className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatBar;
