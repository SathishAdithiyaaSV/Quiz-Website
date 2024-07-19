// src/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000"; // Replace with your backend URL

// Function to create a socket connection with an auth token
const createSocket = (token) => {
  return io(SOCKET_URL, {
    auth: {
      token
    }
  });
};

export default createSocket;
