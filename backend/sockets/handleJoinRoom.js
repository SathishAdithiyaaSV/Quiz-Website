import User from "../models/userModel.js";
import Room from "../models/roomModel.js";
import Team from "../models/teamModel.js";
import { userSocketMap } from "./socketHandler.js";

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

    var member;
    for(member of members)
    {
        if(userSocketMap[member]!==socket.user.username)
            io.to(userSocketMap[member]).emit('requestToJoinTeam', `Do you want to join team ${teamName}`)
    }

    const room = await Room.findOne({ name: roomName });
    if (!room) {
        io.to(socket._id).emit('privateMessage', "Room does not exist");
        return;
    }

    team = await Team({name: teamName, admin: admin, mambers: members, room: room});
    team = await team.save();
    room.teams.push(team._id);
    
            
    /*const username = socket.user.username;
    socket.join(roomId);
    console.log(`Client ${username} joined room ${roomId}`);
    */
};
