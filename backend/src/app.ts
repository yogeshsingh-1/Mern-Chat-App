import server, { app } from "./index.js";
import "./utils/socket.utils.js"
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import errorHandleMiddleware from "./middlewares/error.middleware.js";
import authMiddleware from "./middlewares/auth.middleware.js";
import verifyRoute from "./routes/verify.routes.js"
const port = process.env.port || 5000;

app.use("/", authRouter);
app.use("/api/v1", authMiddleware, userRouter);
app.use("/api/v1/verify", authMiddleware, verifyRoute);
// error handler
app.use(errorHandleMiddleware);


server.listen(port, () => console.log(`server is listening on port ${port}`));