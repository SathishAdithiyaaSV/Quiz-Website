import User from "../models/userModel.js";
import Room from "../models/roomModel.js";
import Team from "../models/teamModel.js";
import Question from "../models/questionModel.js";
import Round from "../models/roundModel.js";
import { userSocketMap } from "./socketHandler.js";
import { io } from "../app.js";

export const handleShowRules = async (socket, details) => {
    const { roomName, round, qnNo, teamName } = JSON.parse(details);
    const room = await Room.findOne({ name: roomName });
    if (!room) {
        io.to(socket.id).emit('privateMessage', "Room does not exist");
        return;
    }

    const qn = await Question.findById(room.rounds[round+1].questions[qnNo +1 ].toString());
    const team = await Team.findOne({ name: teamName });
    await Question.updateOne({_id: qn._id}, {$set : {buzzedIn: team._id}});
    io.in(roomName).emit('buzzedIn', {team: team, qn: qn});
}