import { Socket } from "socket.io";
import { io } from "../index.js";

io.on("connection", (socket) => {
    // io.sockets.emit("mgs", "hi from yogesh")
    console.log("A user Connected")

    // server
    socket.on("msg", (msg) => {
        console.log(msg);
    });
    socket.broadcast.emit("forall", "hi fro yogesh");
    socket.on("disconnect", () => { console.log("disconnected from the server") });
})

const chatNamespace = io.of("/chat");

chatNamespace.on("connection", (socket) => {
    socket.emit("chat-new", "new user added");
    chatNamespace.emit("new-user", "new user connected")
})