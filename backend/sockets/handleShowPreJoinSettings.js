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
    const roomObjId = new mongoose.Types.ObjectId(roomId)
    const room = await Room.findById(roomObjId);
    if (!room) {
        io.to(socket.id).emit('privateMessage', "Room does not exist");
        return;
    }
    if(socket.user.rooms.includes(roomObjId))
    {
        socket.join(roomId);
        if(socket.user._id.toString() === room.host.toString()) 
        {
            io.to(socket.id).emit('preJoinSettings', JSON.stringify({inRoom: true, isHost:true}));
            console.log(socket.id);
        }
        else
            io.to(socket.id).emit('preJoinSettings', JSON.stringify({inRoom: true}));
    }
    else
    {
        if(room.isTeam)
            io.to(socket.id).emit('preJoinSettings', JSON.stringify({username: socket.user.username, roomName: room.name, isTeam: room.isTeam, teamSize: room.teamSize}));
        else
            io.to(socket.id).emit('preJoinSettings', JSON.stringify({username: socket.user.username, roomName: room.name, isTeam: room.isTeam, teamSize: null}));
    }
}