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
    if(!room.rounds[round])
    {   socket.emit('roundsFinished');
        return;
    }
    const rnd = await Round.findById(room.rounds[round]);
    if(!rnd.questions[qnNo])
    {   socket.emit('questionsFinished');
        return;
    }
    const qn = await Question.findById(rnd.questions[qnNo]).lean();
    var settings;
    if(room.settingsLevel === "room")
        settings = await Settings.findById(room.settings);
    else if(room.settingsLevel === "round")
        settings = await Settings.findById(rnd.settings);
    else if(room.settingsLevel === "question")
        settings = await Settings.findById(qn.settings);
    qn["points"] = settings.points;
    qn["time"] = settings.time;
    qn["buzzer"] = settings.buzzer;
    qn["qnNo"] = qnNo;
    qn["round"] = round;
    delete qn["answer"];
    io.in(roomId).emit('question', JSON.stringify(qn));
}
