import { io } from "../index.js";

// io.on("connection", (socket) => {
//     // io.sockets.emit("mgs", "hi from yogesh")
//     console.log("A user Connected")

//     // server
//     socket.on("msg", (msg) => {
//         console.log(msg);
//     });
//     socket.broadcast.emit("forall", "hi fro yogesh");
//     socket.on("disconnect", () => { console.log("disconnected from the server") });
// })

// const chatNamespace = io.of("/chat");

// chatNamespace.on("connection", (socket) => {
//     socket.emit("chat-new", "new user added");
//     chatNamespace.emit("new-user", "new user connected")
// })

io.on("connection", (socket) => {
  console.log(socket.id)
  socket.on("join-room", (roomId) => socket.join(roomId));

  socket.on("send-message", (data) => {
    console.log(data)
    io.to(data.roomId).emit("rec-msg", {
      roomId: data.roomId, msg: data.msg
    });
  });
});

// io.on("connection", (socket) => {
//   // const userId = socket.user.id;

//   // user apne room me join karega
//   // socket.join("join-remoo");

//   // console.log(`User connected: ${userId}`);

//   socket.on("sendMessage", ({ toUserId, message }) => {
//     io.to(toUserId).emit("receiveMessage", {
//       from: userId,
//       message,
//     });
//   });
// });
