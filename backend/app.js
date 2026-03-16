import app from "./server.js";
import { Server } from "socket.io";
import http from "http";
const port = process.env.PORT ?? 5000;
const server = http.createServer(app);
const io = new Server(server);
// Global Error Handler
app.use((err, req, res, next) => {
  return res.status(err.status ?? 500).json({
    status: false,
    message: err.message || "Something went wrong",
  });
});
server.listen(port, () => console.log(`server is listening on port ${port}`));
