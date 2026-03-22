import cookie from "cookie";
import jwt from "jsonwebtoken";

io.on("connection", (socket) => {
  const rawCookie = socket.handshake.headers.cookie;

  const parsed = cookie.parse(rawCookie || "");

  const token = parsed.token;

  try {
    const decoded = jwt.verify(token, "SECRET");

    const userId = decoded.id;

    socket.join(userId);

    console.log("User connected:", userId);

  } catch (err) {
    socket.disconnect();
  }
});