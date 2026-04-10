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
  // setInterval(() => {
  //   io.emit("msg", "hello bhai");
  // }, 1000);
  socket.on("join-room", (roomId) => {
    console.log("room-created", roomId);
    socket.join(roomId);
  });

  socket.on("send-message", (data) => {
    console.log(data);
    io.to(data.roomId).emit("rec-msg", {
      roomId: data.roomId,
      msg: data.msg,
      senderId: data.senderId,
    });
  });
  socket.on("typing", (data) => {
    io.to(data.roomId).emit("typing", {
      roomId: data.roomId,
      recId: data.recId,
    });
  });
  socket.on("stop-typing", (data) => {
    io.to(data.roomId).emit("stop-typing", {
      roomId: data.roomId,
      recId: data.recId,
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
