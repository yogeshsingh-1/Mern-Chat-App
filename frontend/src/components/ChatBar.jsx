import { useEffect, useRef, useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
const ChatBar = ({ selectedUser, chatData }) => {
  const { id } = useContext(AuthContext);
  const [messages, setMessages] = useState([
    { text: "Hi Yogesh", sender: "me", time: "10:00 AM" },
    { text: "Hello Jai", sender: "other", time: "10:01 AM" },
  ]);
  console.log(chatData);
  console.log(selectedUser);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  //  Auto scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { text: input, sender: id, time: getTime() },
    ]);
    setInput("");
  };

  // ⌨️ Enter to send
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex flex-col w-full h-full bg-zinc-100 overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b bg-white font-semibold shrink-0">
        {selectedUser?.name || "Chat"}
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatData.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === id ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex flex-col max-w-xs">
              <div
                className={`px-4 py-2 rounded-2xl text-sm ${
                  msg.sender === "me"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-black rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-zinc-400 mt-1 px-1">
                {msg.time}
              </span>
            </div>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white flex items-center gap-2 shrink-0">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 text-sm outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBar;
