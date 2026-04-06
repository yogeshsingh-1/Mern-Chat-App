// src/socket/socket.ts
import { io } from "socket.io-client";

let socket = null;

const getSocket = () => {
  if (!socket) {
    socket = io("http://localhost:5000", {
      // autoConnect: false,
      transports: ["websocket"],
    });
  }

  return socket;
};

export default getSocket;
