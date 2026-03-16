<!-- WebSocket -->

WebSocket एक full-duplex real-time communication protocol है जो client और server के बीच real-time communication allow करता है।

Full-duplex → Client और Server दोनों एक-दूसरे को message भेज सकते हैं।

Connection persistent (open) रहता है।

Example:
1.Chat Application
2.Live Notifications
3.Messaging systems
4.Live dashboards

<!-- Normal HTTP में क्या होता है -->
HTTP में process ऐसा होता है:

1.Client request भेजता है

2.Server response देता है

3.Connection close हो जाता है

अगर दुबारा data चाहिए:

1.Client फिर request भेजेगा

2.Server फिर response देगा

3.Connection फिर close

👉 मतलब हर request के लिए नया connection बनता है।

<!-- WebSocket -->
पहले Normal HTTP connection को WebSocket में upgrade किया जाता है

Browser और Server एक बार connect होते हैं

Connection open रहता है (Persistent connection)

Client और Server कभी भी message भेज सकते हैं

👉 बार-बार request करने की जरूरत नहीं।

<!-- Polling -->

Polling एक technique है जिसमें:

Client बार-बार server से पूछता है:

“कोई नया data आया है क्या?”

इससे extra requests और server load बढ़ जाता है।

इस problem को solve करने के लिए WebSocket use किया जाता है।



<!-- Code -->
import { Server } from "socket.io";
import http from "http";
const app =express();

const server = http.createServer(app);
const io = new Server(server);
server.listen(port, () => console.log(`server is listening on port ${port}`));