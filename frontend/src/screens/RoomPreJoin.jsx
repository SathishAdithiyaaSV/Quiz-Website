import React from "react";
import InputBox from '../components/InputBox';

const RoomPreJoin = ({ roomName, admin, isTeam, users, setUsers, handleClick, teamName, setTeamName, teamSize }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">{roomName}</h2>
                {isTeam && (
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="teamName">Team Name</label>
                        <input
                            type="text"
                            id="teamName"
                            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                            placeholder="Enter your team name"
                            value={teamName}
                            onChange={e => setTeamName(e.target.value)}
                        />
                    </div>
                )}
                {isTeam && (
                    <div className="mb-4">
                        <p className="text-lg mb-2">Member 1 / Admin: {admin}(You)</p>
                        {Array.from({ length: teamSize - 1 }, (_, i) => (
                            <InputBox key={i + 1} no={i + 2} users={users} setUsers={setUsers} />
                        ))}
                    </div>
                )}
                <button
                    type="button"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleClick}
                >
                    Join Room
                </button>
            </div>
        </div>
    );
};

export default RoomPreJoin;
