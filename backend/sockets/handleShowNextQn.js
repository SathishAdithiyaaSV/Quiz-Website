import User from "../models/userModel.js";
import Room from "../models/roomModel.js";
import Team from "../models/teamModel.js";
import Question from "../models/questionModel.js";
import Round from "../models/roundModel.js";
import Settings from "../models/settingsModel.js";
import { userSocketMap } from "./socketHandler.js";
import { io } from "../app.js";
import mongoose from "mongoose";

export const handleShowNextQn = async (socket, details) => {
    const { roomId, round, qnNo } = JSON.parse(details);
    const roomObjId = new mongoose.Types.ObjectId(roomId)
    const room = await Room.findById(roomObjId);
    if (!room) {
        io.to(socket.id).emit('privateMessage', "Room does not exist");
        return;
    }
    const rnd = await Round.findById(room.rounds[round]);
    const qn = await Question.findById(rnd.questions[qnNo]).lean();
    const settings = await Settings.findById(room.settings);
    qn["points"] = settings.points;
    qn["time"] = settings.time;
    qn["buzzer"] = settings.buzzer;
    delete qn["answer"];
    console.log(qn);
    io.in(roomId).emit('question', JSON.stringify(qn));
}
