import User from "../models/userModel.js";
import Room from "../models/roomModel.js";
import Team from "../models/teamModel.js";
import Question from "../models/questionModel.js";
import Round from "../models/roundModel.js";
import Settings from "../models/settingsModel.js";
import { userSocketMap } from "./socketHandler.js";
import { io } from "../app.js";
import mongoose from "mongoose";

export const handleBuzzIn = async (socket, details) => {
    const { roomId, round, qnNo, teamName, mainTime } = JSON.parse(details);
    const roomObjId = new mongoose.Types.ObjectId(roomId)
    const room = await Room.findById(roomObjId);
    if (!room) {
        io.to(socket.id).emit('privateMessage', "Room does not exist");
        return;
    }
    const rnd = await Round.findById(room.rounds[round]);
    const qn = await Question.findById(rnd.questions[qnNo]);
    const team = await Team.findOne({ name: teamName });
    var settings;
    if(room.settingsLevel === "room")
        settings = await Settings.findById(room.settings);
    else if(room.settingsLevel === "round")
        settings = await Settings.findById(rnd.settings);
    else if(room.settingsLevel === "question")
        settings = await Settings.findById(qn.settings);
    await Question.updateOne({_id: qn._id}, {$set : {buzzedIn: team._id, buzzNo: qn.buzzNo + 1, mainTime: mainTime}});
    io.in(roomId).emit('buzzedIn', JSON.stringify({teamName: team.name, buzzNo: qn.buzzNo + 1}));
    for (const member of team.members) {
        const memberSocket = io.sockets.sockets.get(userSocketMap.get(member._id.toString()));
        var time;
        var points;
        if(qn.buzzNo + 1 == 1)
        {
            time = settings.timeAfterFirstBuzz;
            points = settings.firstBuzzAnsweredCorrect;
            console.log({points: points, time: time});
        }
        else if(qn.buzzNo + 1 == 2)
        {
            time = settings.timeAfterSecondBuzz;
            points = settings.secondBuzzAnsweredCorrect;
        } 
        else if(qn.buzzNo + 1 == 3)
        {
            time = settings.timeAfterThirdBuzz;
            points = settings.thirdBuzzAnsweredCorrect;
        }
        memberSocket.emit('buzzedInTeam', JSON.stringify({points: points, time: time}));
    }
}