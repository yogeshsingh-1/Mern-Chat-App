import express, { Application } from "express";
import cors from "cors"
import "dotenv/config";
import { createServer } from "http"
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import path from "path";
import connectToDB from "./config/db.js";
import cookieParser from "cookie-parser";
export const app: Application = express();
const server = createServer(app);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const io = new Server(server, {
  cors: { origin: "*" },
});
connectToDB();
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({
  origin: "*", credentials: true
}))
app.use(cookieParser())
export default server;
