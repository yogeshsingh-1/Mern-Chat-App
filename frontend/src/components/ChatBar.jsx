import { useState } from "react";
const ChatBar = () => {
  const [messages, setMessages] = useState([
    { text: "Hi Yogesh", sender: "user1" },
    { text: "Hello Jai", sender: "user2" },
    { text: "How are you?", sender: "user1" },
    { text: "I am fine.", sender: "user2" },
  ]);
  return (
    <div className="flex-1 bg-zinc-300 rounded-md">
      <div className="flex flex-col">
        {messages.map((message) => (
          <div
            className={`flex ${(message.sender = "user1" ? "justify-end" : "justify-start")}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      {/* input */}
      <div className=""></div>
    </div>
  );
};

export default ChatBar;

// import { useState } from "react";

// const ChatBar = () => {
//   const [messages, setMessages] = useState([
//     { text: "Hi Yogesh", sender: "user1" },
//     { text: "Hello Jai", sender: "user2" },
//     { text: "How are you?", sender: "user1" },
//     { text: "I am fine.", sender: "user2" },
//   ]);

//   const [input, setInput] = useState("");

//   const handleSend = () => {
//     if (!input.trim()) return;

//     setMessages((prev) => [
//       ...prev,
//       { text: input, sender: "user1" }, // current user
//     ]);
//     setInput("");
//   };

//   return (
//     <div className="flex-1 flex-col h-full bg-zinc-200 rounded-md">
//       {/* Chat Area */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-3">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex ${
//               msg.sender === "user1" ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`px-4 py-2 rounded-2xl max-w-xs text-sm ${
//                 msg.sender === "user1"
//                   ? "bg-blue-500 text-white rounded-br-none"
//                   : "bg-white text-black rounded-bl-none"
//               }`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Input Area */}
//       <div className="p-3 border-t bg-white flex gap-2">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="iMessage..."
//           className="flex-1 border rounded-full px-4 py-2 text-sm outline-none"
//         />
//         <button
//           onClick={handleSend}
//           className="bg-blue-500 text-white px-4 rounded-full"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatBar;
