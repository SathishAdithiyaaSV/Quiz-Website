// backend/sockets/socketHandler.js
import { io } from '../app.js'; // Ensure io is properly imported and available
import User from "../models/userModel.js";
import Room from "../models/roomModel.js";
import Team from "../models/teamModel.js";
import { handleShowPreJoinSettings } from "./handleShowPreJoinSettings.js";
import { handleJoinRoom } from "./handleJoinRoom.js";
import { handleShowRules } from "./handleShowRules.js";
import { handleShowNextQn } from "./handleShowNextQn.js";
import { handleBuzzIn } from "./handleBuzzIn.js";
import { handleSubmitAnswer } from "./handleSubmitAnswer.js";

const userSocketMap = new Map();

export const handleSocketConnection = async (socket) => {
    const userId = socket.user && socket.user._id ? socket.user._id.toString() : null; // Ensure user ID is correctly retrieved

    if (!userId) {
        console.error('User ID not found in socket');
        socket.disconnect(true); // Disconnect if user ID is not found
        return;
    }

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

    socket.on('showPreJoinSettings', async (details) => {
        await handleShowPreJoinSettings(socket, details);
    });

    socket.on('joinRoom', async (details) => {
        await handleJoinRoom(socket, details);
    });

    socket.on('showRules', async (details) => {
        await handleShowRules(socket, details);
    });

    socket.on('showNextQuestion', async (details) => {
        await handleShowNextQn(socket, details);
    });

    socket.on('buzzIn', async (details) => {
        await handleBuzzIn(socket, details);
    });

    socket.on('submitAnswer', async (details) => {
        await handleSubmitAnswer(socket, details);
    });

    socket.on('leaveRoom', (roomId) => {
        socket.leave(roomId);
        console.log(`Client ${socket.id} left room ${roomId}`);
    });

    socket.on('disconnect', () => {
        userSocketMap.delete(userId); // Remove the user from the map on disconnect
        console.log('Client disconnected:', socket.id);
    });
};

export { userSocketMap };
