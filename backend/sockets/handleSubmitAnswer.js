import User from "../models/userModel.js";
import Room from "../models/roomModel.js";
import Team from "../models/teamModel.js";
import Question from "../models/questionModel.js";
import Round from "../models/roundModel.js";
import { userSocketMap } from "./socketHandler.js";
import { io } from "../app.js";

export const handleSubmitAnswer = async (socket, details) => {
    const { roomName, round, qnNo, teamName, ansSubmitted } = JSON.parse(details);
    const room = await Room.findOne({ name: roomName });
    if (!room) {
        io.to(socket.id).emit('privateMessage', "Room does not exist");
        return;
    }

    const qn = await Question.findById(room.rounds[round+1].questions[qnNo +1 ].toString());
    const team = await Team.findOne({ name: teamName });
    var data = {};
    if (ansSubmitted === qn.answer) {
        //var member;
        /*for (member of team.members)
        {
            let memberSocket = io.sockets.sockets.get(userSocketMap.get(member._id.toString()));
            memberSocket.emit('privateMessage', teamName + " answered correctly");
        }*/
        data = {team: teamName, answeredCorrectly: true}
    }    

    else {
        //var member;
        /*for (member of team.members)
        {
            let memberSocket = io.sockets.sockets.get(userSocketMap.get(member._id.toString()));
            memberSocket.emit('privateMessage', teamName + " answered incorrectly. The correct answer is: " + qn.answer);
        }*/
        data = {team: teamName, answeredCorrectly: false, correctAnswer: qn.answer};
    }
    io.in(roomName).emit('answered', data);
}