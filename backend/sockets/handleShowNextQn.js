import User from "../models/userModel.js";
import Room from "../models/roomModel.js";
import Team from "../models/teamModel.js";
import Question from "../models/questionModel.js";
import Round from "../models/roundModel.js";
import { userSocketMap } from "./socketHandler.js";
import { io } from "../app.js";
import mongoose from "mongoose";

export const handleShowNextQn = async (socket, details) => {
    const { roomId, round, qnNo } = JSON.parse(details);
    const roomObjId = mongoose.Types.ObjectId(roomId)
    const room = await Room.findById(roomObjId);
    if (!room) {
        io.to(socket.id).emit('privateMessage', "Room does not exist");
        return;
    }
    const rnd = await Round.findById(room.rounds[round+1]);
    const qn = await Question.findById(rnd.questions[qnNo +1 ]);
    delete qn["answer"];
    io.in(roomName).emit('question', qn);
}
