import User from "../models/userModel.js";
import Room from "../models/roomModel.js";
import Team from "../models/teamModel.js";
import { userSocketMap } from "./socketHandler.js";
import { io } from "../app.js";
import mongoose from "mongoose";

export const handleJoinRoom = async (socket, details) => {
    const { roomId, teamName, users } = JSON.parse(details);
    const roomObjId = new mongoose.Types.ObjectId(roomId);
    var username = "";
    var members = [];
    var admin;
    console.log(users);
    for(username of users)
    {
        const user = await User.findOne({ username });
        if(user)
        {
            if(user.rooms.includes(roomObjId))
            {
                io.to(socket._id).emit('privateMessage', `${username} is already in the room`);
                return;
            }
            members.push(user._id)
        }
        else
        {
            io.to(socket._id).emit('privateMessage', `${username} does not exists`);
            return;
        }
    }

    members.push(socket.user._id);
    admin = socket.user._id;
    const room = await Room.findById(roomObjId);
    if (!room) {
        io.to(socket._id).emit('privateMessage', "Room does not exist");
        return;
    }
    const team = new Team({name: teamName, admin: admin, members: members, room: room});
    const newTeam = await team.save();
    await Room.updateOne({_id: roomObjId}, {$push : {teams: newTeam._id}});
    console.log("team saved");

    var member;
    for (member of members)
    {
        let memberSocket = io.sockets.sockets.get(userSocketMap.get(member._id.toString()));
        console.log(memberSocket.id);
        memberSocket.join(roomId);
        memberSocket.emit('joined', roomId);
        await User.updateOne({_id: memberSocket.user._id}, {$push : {rooms: roomObjId}});
        await User.updateOne({_id: memberSocket.user._id}, {$push : {teams: newTeam._id}});
    }
    io.to(socket.id).emit('privateMessage', "Team saved successfully and added to room");
    
            

};
