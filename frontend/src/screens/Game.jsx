import React, { useEffect, useState } from 'react';
import createSocket from '../socket';
import RoomPreJoin from './RoomPreJoin'; // Adjust the import path as necessary
import QuizRoom from './QuizRoom';
import { useParams } from 'react-router-dom';

const socket = createSocket(localStorage.getItem('jwtToken'));

const GamePage = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [username, setUsername] = useState('');
    const [roomName, setRoomName] = useState('Game Room');
    const [isTeam, setIsTeam] = useState(true);
    const [users, setUsers] = useState([]);
    const [teamName, setTeamName] = useState('');
    const [inGame, setInGame] = useState(false);
    const [teamSize, setTeamSize] = useState(0);
    const [isHost, setIsHost] = useState(false);
    const { roomId } = useParams();

    useEffect(() => {
        // Ensure socket listeners are set up only once
        socket.emit('showPreJoinSettings', JSON.stringify({ roomId }));

        const handlePreJoinSettings = (details) => {
            const parsedDetails = JSON.parse(details);
            if(parsedDetails.inRoom)
            {
                setInGame(true);
                if(parsedDetails.isHost)
                    setIsHost(true);
            }
            else
            {
                setRoomName(parsedDetails.roomName);
                setIsTeam(parsedDetails.isTeam);
                setTeamSize(parsedDetails.teamSize);
                setUsername(parsedDetails.username);
            }
        };

        const handlePrivateMessage = (message) => {
            alert(message);
        };

        const handleConnect = () => {
            setIsConnected(true);
        };

        const handleDisconnect = () => {
            setIsConnected(false);
        };

        socket.on('preJoinSettings', handlePreJoinSettings);
        socket.on('privateMessage', handlePrivateMessage);
        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);

        return () => {
            // Cleanup listeners on unmount
            socket.off('preJoinSettings', handlePreJoinSettings);
            socket.off('privateMessage', handlePrivateMessage);
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
        };
    }, [roomId]); // Re-run effect only if roomId changes

    const handleClick = () => {
        if (socket) {
            socket.emit('joinRoom', JSON.stringify({ roomId, teamName, users }));
            socket.on('privateMessage', (message) => alert(message));
 //           setInGame(true); // Switch to the GameRoom component
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            {isConnected ? (
                inGame ? (
                    <QuizRoom
                        socket={socket}
                        roomId={roomId}
                        teamName={teamName}
                        isHost={isHost}
                    /> 
                ) : (
                    <RoomPreJoin
                        roomName={roomName}
                        admin={username}
                        isTeam={isTeam}
                        users={users}
                        setUsers={setUsers}
                        handleClick={handleClick}
                        teamName={teamName}
                        setTeamName={setTeamName}
                        teamSize={teamSize}
                    />
                )
            ) : (
                <p>Connecting...</p>
            )}
        </div>
    );
};

export default GamePage;
