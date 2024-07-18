import User from "../models/userModel.js";
import Room from "../models/roomModel.js";
import Team from "../models/teamModel.js";
import Round from "../models/roundModel.js";
import { userSocketMap } from "./socketHandler.js";
import { io } from "../app.js";
import mongoose from "mongoose";

export const handleShowRules = async (socket, details) => {
    const { roomId, round } = JSON.parse(details);
    const roomObjId = mongoose.Types.ObjectId(roomId);
    const room = await Room.findOne(roomObjId);
    if (!room) {
        io.to(socket.id).emit('privateMessage', "Room does not exist");
        return;
    }
    const roundRules = await Round.findById(room.rounds[round+1]);
    io.in(roomName).emit('roundRules', roundRules);
}