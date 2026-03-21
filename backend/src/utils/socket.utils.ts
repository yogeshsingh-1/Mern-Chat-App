import { io } from "../index.js";

io.on("connection", (socket) => {
    // io.sockets.emit("mgs", "hi from yogesh")
    console.log("A user Connected")

    // server
    socket.on("msg", (msg) => {
        console.log(msg);
    });
    socket.on("disconnect", () => { console.log("disconnected from the server") });
})