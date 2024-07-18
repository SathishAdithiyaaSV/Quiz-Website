import User from "../models/userModel.js";
import Room from "../models/roomModel.js";
import Team from "../models/teamModel.js";
import Question from "../models/questionModel.js";
import Round from "../models/roundModel.js";
import { userSocketMap } from "./socketHandler.js";
import { io } from "../app.js";
import mongoose from "mongoose";

export const handleShowPreJoinSettings = async (socket, details) => {
    const { roomId } = JSON.parse(details);
    const roomObjId = mongoose.Types.ObjectId(roomId)
    const room = await Room.findById(roomObjId);
    if (!room) {
        io.to(socket.id).emit('privateMessage', "Room does not exist");
        return;
    }
    if(room.isTeam)
        io.to(socket.id).emit('preJoinSettings', {isTeam: room.isTeam, teamSize: room.teamSize});
    else
        io.to(socket.id).emit('preJoinSettings', {isTeam: room.isTeam, teamSize: null});
}