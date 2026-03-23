import server, { app } from "./index.js";
import "./utils/socket.utils.js"
import userRoutes from "./routes/user.routes.js"
import errorHandleMiddleware from "./middlewares/error.middleware.js";
const port = process.env.port || 5000;

app.use("/", userRoutes);

// error handler
app.use(errorHandleMiddleware);
server.listen(port, () => console.log(`server is listening on port ${port}`));