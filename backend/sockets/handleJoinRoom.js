import User from "../models/userModel.js";
import Room from "../models/roomModel.js";
import Team from "../models/teamModel.js";
import { userSocketMap } from "./socketHandler.js";
import { io } from "../app.js";
import mongoose from "mongoose";

export const handleJoinRoom = async (socket, details) => {
    const { roomId, teamName, users } = JSON.parse(details);
    const roomObjId = mongoose.Types.ObjectId(roomId);
    var username = "";
    var members = [];
    var admin;
    for(username of users)
    {
        const user = await User.findOne({ username });
        if(user)
        {
            members.push(user._id)
            if(user.username === socket.user.username)
                admin = user._id;
        }
        else
        {
            io.to(socket._id).emit('privateMessage', "Username does not exists");
            break;
        }
    }


    const room = await Room.findById(roomObjId);
    if (!room) {
        io.to(socket._id).emit('privateMessage', "Room does not exist");
        return;
    }
    team = new Team({name: teamName, admin: admin, members: members, room: room});
    let newTeam = await team.save();
    await Room.updateOne({_id: roomObjId}, {$push : {teams: newTeam._id}});
    console.log("team saved");

    var member;
    for (member of members)
    {
        let memberSocket = io.sockets.sockets.get(userSocketMap.get(member._id.toString()));
//        console.log(memberSocket.id);
        memberSocket.join(roomName);
    }
    io.to(socket.id).emit('privateMessage', "Team saved successfully and added to room");
    
            

};
