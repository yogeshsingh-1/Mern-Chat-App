import server, { app } from "./index.js";
import "./utils/socket.utils.js"
const port = process.env.port || 5000;

app.get("/", (req, res) => {
    return res.sendFile("./index.html")
})

server.listen(port, () => console.log(`server is listening on port ${port}`));