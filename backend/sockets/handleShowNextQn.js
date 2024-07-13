import User from "../models/userModel.js";
import Room from "../models/roomModel.js";
import Team from "../models/teamModel.js";
import Question from "../models/questionModel.js";
import Round from "../models/roundModel.js";
import { userSocketMap } from "./socketHandler.js";
import { io } from "../app.js";

export const handleShowNextQn = async (socket, details) => {
    const { roomName, round, qnNo } = JSON.parse(details);
    const room = await Room.findOne({ name: roomName });
    if (!room) {
        io.to(socket.id).emit('privateMessage', "Room does not exist");
        return;
    }

    const qn = await Question.findById(room.rounds[round+1].questions[qnNo +1 ].toString());
    io.in(roomName).emit('question', qn);
}
