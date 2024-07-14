import User from "../models/userModel.js";
import Room from "../models/roomModel.js";
import Team from "../models/teamModel.js";
import Question from "../models/questionModel.js";
import Round from "../models/roundModel.js";
import Settings from "../models/settingsModel.js";
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
    const qnSettings = await Settings.findById(qn.settings.toString());
    var data = {};
    var pts;
    if (ansSubmitted === qn.answer) {
        //var member;
        /*for (member of team.members)
        {
            let memberSocket = io.sockets.sockets.get(userSocketMap.get(member._id.toString()));
            memberSocket.emit('privateMessage', teamName + " answered correctly");
        }*/
        if (qn.buzzNo === 1)
            pts=qnSettings.firstBuzzAnsweredCorrect;
        else if (qn.buzzNo === 2)
            pts=qnSettings.secondBuzzAnsweredCorrect;
        else if (qn.buzzNo === 3)
            pts=qnSettings.thirdBuzzAnsweredCorrect;
        data = {team: teamName, answeredCorrectly: true}
    }    

    else {
        //var member;
        /*for (member of team.members)
        {
            let memberSocket = io.sockets.sockets.get(userSocketMap.get(member._id.toString()));
            memberSocket.emit('privateMessage', teamName + " answered incorrectly. The correct answer is: " + qn.answer);
        }*/
        if (qn.buzzNo === 1)
            pts= -qnSettings.firstBuzzAnsweredIncorrect;
        else if (qn.buzzNo === 2)
            pts= -qnSettings.secondBuzzAnsweredIncorrect;
        else if (qn.buzzNo === 3)
            pts= -qnSettings.thirdBuzzAnsweredIncorrect;
        data = {team: teamName, answeredCorrectly: false, correctAnswer: qn.answer};
    }
    await Team.updateOne({_id: teamName._id}, {$inc: {points: pts}});
    const Teams = room.teams.map( async team => await Team.findById(team.toString()))
    const Leaderboard = Teams.sort({ points: -1 }); // sort descending
    //return users.map(user => ({ id: user.id, score: user.score }));
    io.in(roomName).emit('answered', data);
    io.in(roomName).emit('leaderboard', Leaderboard);
}