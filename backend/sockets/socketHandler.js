// backend/sockets/socketHandler.js
import User from "../models/userModel.js";
import Room from "../models/roomModel.js";
import Team from "../models/teamModel.js";
import { handleJoinRoom } from "./handleJoinRoom.js";
import { handleShowRules } from "./handleShowRules.js";
import { handleShowNextQn } from "./handleShowNextQn.js";

const userSocketMap = new Map();

export const handleSocketConnection = async (socket) => {
    const userId = socket.user._id.toString(); // Retrieve user ID from socket

    // Check if the user is already connected
    if (userSocketMap.has(userId)) {
        const existingSocketId = userSocketMap.get(userId);
        const existingSocket = io.sockets.sockets.get(existingSocketId);
        if (existingSocket) {
            existingSocket.disconnect(true); // Disconnect the existing socket
        }
    }

    // Map the new socket ID to the user ID
    userSocketMap.set(userId, socket.id);

    console.log('New client connected:', socket.id);

    socket.on('joinRoom', (roomId) => {
        handleJoinRoom(socket, roomId);
    });

    socket.on('showRules', (details) => {
        handleShowRules(socket, details);
    });

    socket.on('showNextQn', (details) => {
        handleShowNextQn(socket, details);
    });

    socket.on('buzzIn', (details) => {
        handleBuzzIn(socket, details);
    });

    socket.on('submitAnswer', (details) => {
        handleSubmitAnswer(socket, details);
    });


    socket.on('leaveRoom', (roomId) => {
        socket.leave(roomId);
        console.log(`Client ${socket.id} left room ${roomId}`);
    });



    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
};

export { userSocketMap };
