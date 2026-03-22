import express, { Application } from "express";
import cors from "cors"
import "dotenv/config";
import { createServer } from "http"
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import path from "path";
export const app: Application = express();

const server = createServer(app);
export const io = new Server(server, {
  cors: { origin: "*" },
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));
app.use(cors({
    origin: "*", credentials: true
}))

export default server;
