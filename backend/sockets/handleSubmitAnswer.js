import User from "../models/userModel.js";
import Room from "../models/roomModel.js";
import Team from "../models/teamModel.js";
import Question from "../models/questionModel.js";
import Round from "../models/roundModel.js";
import Settings from "../models/settingsModel.js";
import { userSocketMap } from "./socketHandler.js";
import { io } from "../app.js";
import mongoose from "mongoose";

export const handleSubmitAnswer = async (socket, details) => {
    const { roomId, round, qnNo, teamName, ansSubmitted, timeOut, buzzNo } = JSON.parse(details);
    const roomObjId = new mongoose.Types.ObjectId(roomId);
    const room = await Room.findById(roomObjId);
    if (!room) {
        io.to(socket.id).emit('privateMessage', "Room does not exist");
        return;
    }

    const rnd = await Round.findById(room.rounds[round]);
    const qn = await Question.findById(rnd.questions[qnNo]);
    const team = await Team.findOne({ name: teamName });
    var qnSettings;
    if(room.settingsLevel === "room")
        qnSettings = await Settings.findById(room.settings);
    else if(room.settingsLevel === "round")
        qnSettings = await Settings.findById(rnd.settings);
    else if(room.settingsLevel === "question")
        qnSettings = await Settings.findById(qn.settings);

    if(timeOut && (socket.user._id.toString() !== team.admin.toString()))
        return;
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
        data = {team: teamName, answeredCorrectly: true, correctAnswer: qn.answer}
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
        if(qnSettings.numberOfBuzzes > buzzNo)
            data = {team: teamName, answeredCorrectly: false, mainTime: qn.mainTime};
        else
            data = {team: teamName, answeredCorrectly: false, correctAnswer: qn.answer, mainTime: qn.mainTime, buzzesLimitExceeded: true};
    }
    console.log(team);
    await Team.updateOne({_id: team._id}, {$inc: {points: pts}});
    const teams = await Team.find({ _id: { $in: room.teams } });
    const sortedTeams = teams.sort((a, b) => b.points - a.points);

    // Emit the sorted leaderboard
    io.in(roomId).emit('answered', JSON.stringify(data));
    io.in(roomId).emit('leaderboard', JSON.stringify(sortedTeams.map(team => ({
        name: team.name,
        points: team.points
    }))));
}