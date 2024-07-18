import User from "../models/userModel.js";
import Room from "../models/roomModel.js";
import Team from "../models/teamModel.js";
import Question from "../models/questionModel.js";
import Round from "../models/roundModel.js";
import { userSocketMap } from "./socketHandler.js";
import { io } from "../app.js";
import mongoose from "mongoose";

export const handleShowRules = async (socket, details) => {
    const { roomId, round, qnNo, teamName } = JSON.parse(details);
    const roomObjId = mongoose.Types.ObjectId(roomId)
    const room = await Room.findById(roomObjId);
    if (!room) {
        io.to(socket.id).emit('privateMessage', "Room does not exist");
        return;
    }
    const rnd = await Round.findById(room.rounds[round+1]);
    const qn = await Question.findById(rnd.questions[qnNo +1 ]);
    const team = await Team.findOne({ name: teamName });
    await Question.updateOne({_id: qn._id}, {$set : {buzzedIn: team._id, buzzNo: qn.buzzNo + 1 }});
    io.in(roomName).emit('buzzedIn', {team: team, qn: qn});
}