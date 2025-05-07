const express = require("express");
const cors = require("cors");
const http = require("http");
const router = require("./Routes/router");
const socketHandler = require("./socket");

require("dotenv").config();
require("./DB/connection");

const waterServer = express();
const server = http.createServer(waterServer);

waterServer.use(cors({
//   origin: "http://localhost:5173", 
}));
waterServer.use(express.json());
waterServer.use(router);

// Default route
waterServer.get("/", (req, res) => {
  res.send("<h1>Water Server Running</h1>");
});

// Socket.IO
socketHandler(server);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Water Server running on port ${PORT}`);
});
