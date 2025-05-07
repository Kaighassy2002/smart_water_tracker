// src/socket.js
import { io } from "socket.io-client";
import { SERVER_URL } from "./serverURL";

// Replace with your backend URL and port
const socket = io(SERVER_URL, {
  transports: ["websocket"],
});

export default socket;
