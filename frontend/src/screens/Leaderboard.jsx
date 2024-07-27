import React from 'react';

const Leaderboard = ({ leaderboard }) => {
  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold text-center text-white mb-6">Leaderboard</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-300">Rank</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-300">Team Name</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-300">Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((team, index) => (
              <tr key={team.name} className="bg-gray-700 border-b border-gray-600">
                <td className="py-3 px-6 text-sm text-gray-300">{index + 1}</td>
                <td className="py-3 px-6 text-sm text-gray-300">{team.name}</td>
                <td className="py-3 px-6 text-sm text-gray-300">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
