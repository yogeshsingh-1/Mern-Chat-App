<!-- Chat App Architecture -->
React (Frontend)
     |
     |  API + Socket
     |
Node.js + Express
     |
 Socket.IO
     |
MongoDB (store messages)

<!-- Features (Normal Chat App) -->

1️⃣ User signup / login
2️⃣ User list
3️⃣ Send message
4️⃣ Receive message instantly
5️⃣ Store messages in database

<!-- Backend Project Structure -->
server
 ├── models
 │     ├── User.js
 │     └── Message.js
 ├── routes
 │     └── authRoutes.js
 ├── socket
 │     └── socket.js
 ├── server.js

 <!-- Frontend Project Structure -->
 client
 ├── components
 │     ├── Chat.jsx
 │     ├── Message.jsx
 │     └── Sidebar.jsx
 ├── pages
 │     └── Login.jsx
 └── App.jsx


 <!--  -->
 Event Delgation
 Debounce
 Throttle