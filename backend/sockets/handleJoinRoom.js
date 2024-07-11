import User from "../models/userModel.js";
import Room from "../models/roomModel.js";
import Team from "../models/teamModel.js";
import { userSocketMap } from "./socketHandler.js";
import { io } from "../app.js";

export const handleJoinRoom = async (socket, team) => {
    const { roomName, teamName, users } = JSON.parse(team);
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


    const room = await Room.findOne({ name: roomName });
    if (!room) {
        io.to(socket._id).emit('privateMessage', "Room does not exist");
        return;
    }
    team = new Team({name: teamName, admin: admin, members: members, room: room});
    let newTeam = await team.save();
    await Room.updateOne({_id: room._id}, {$push : {teams: newTeam._id}});
    console.log("team saved");
    io.to(socket.id).emit('privateMessage', "Team saved successfully and added to room");
    
            
    /*const username = socket.user.username;
    socket.join(roomId);
    console.log(`Client ${username} joined room ${roomId}`);
    */
};
