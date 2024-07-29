import React, { useState } from 'react';
import RoundCard from '../components/RoundCard'; // Make sure to adjust the import path as needed
import SettingsCard from '../components/SettingsCard';
//import jwtDecode from 'jwt-decode';
const BACKEND_URL =
  import.meta.env.VITE_APP_BACKEND_URL ?? 'http://localhost:3000';

const CreateRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [rounds, setRounds] = useState([{ name: '', questions: [{ text: '', type: 'text', answer: '', options: [] }] }]);
  const [activeRound, setActiveRound] = useState(null);
  const [settingsLevel, setSettingsLevel] = useState('room'); // New state for settings level
  const [settings, setSettings] = useState({ // Initial state for settings
    time: '',
    points: 0,
    buzzer: false,
    answerOnBuzz: false,
    numberOfBuzzes: 1,
    timeAfterFirstBuzz: '',
    timeAfterSecondBuzz: '',
    timeAfterThirdBuzz: '',
    equalPointsOnCorrectAnswer: false,
    firstBuzzAnsweredCorrect: 0,
    firstBuzzAnsweredIncorrect: 0,
    secondBuzzAnsweredCorrect: 0,
    secondBuzzAnsweredIncorrect: 0,
    thirdBuzzAnsweredCorrect: 0,
    thirdBuzzAnsweredIncorrect: 0,
  });
  const [isTeam, setIsTeam] = useState(true);
  const [teamSize, setTeamSize] = useState('');

  const getJwt = () => {
    return localStorage.getItem('jwtToken');
  };
  
  // Function to decode the JWT and extract the username
  /* getUsernameFromJwt = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.username; // Assuming 'username' is the key in the payload
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };
*/
  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  const handleRoundNameChange = (index, e) => {
    const newRounds = [...rounds];
    newRounds[index].name = e.target.value;
    setRounds(newRounds);
  };

  const handleQuestionChange = (roundIndex, questionIndex, e) => {
    const newRounds = [...rounds];
    const { name, value, optionIndex } = e.target;
    if (name === 'type') {
      newRounds[roundIndex].questions[questionIndex].type = value;
      newRounds[roundIndex].questions[questionIndex].options = value === 'mcq' ? [''] : [];
      newRounds[roundIndex].questions[questionIndex].answer = value === 'text' ? '' : undefined;
    } else if (name === 'options') {
      newRounds[roundIndex].questions[questionIndex].options[optionIndex] = value;
    } else if (name === 'deleteOption') {
      newRounds[roundIndex].questions[questionIndex].options.splice(optionIndex, 1);
    } else if (name === 'addOption') {
      newRounds[roundIndex].questions[questionIndex].options.push('');
    } else {
      newRounds[roundIndex].questions[questionIndex].text = value;
    }
    setRounds(newRounds);
  };

  const handleAnswerChange = (roundIndex, questionIndex, e) => {
    const newRounds = [...rounds];
    newRounds[roundIndex].questions[questionIndex].answer = e.target.value;
    setRounds(newRounds);
  };

  const addRound = () => {
    setRounds([...rounds, { name: '', questions: [{ text: '', type: 'text', answer: '', options: [] }] }]);
  };

  const addQuestion = (roundIndex) => {
    const newRounds = [...rounds];
    newRounds[roundIndex].questions.push({ text: '', type: 'text', answer: '', options: [] });
    setRounds(newRounds);
  };

  const deleteRound = (index) => {
    const newRounds = rounds.filter((_, i) => i !== index);
    setRounds(newRounds);
  };

  const deleteQuestion = (roundIndex, questionIndex) => {
    const newRounds = [...rounds];
    newRounds[roundIndex].questions = newRounds[roundIndex].questions.filter((_, i) => i !== questionIndex);
    setRounds(newRounds);
  };

  const openRoundModal = (index) => {
    setActiveRound(index);
  };

  const closeRoundModal = () => {
    setActiveRound(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Room Name:', roomName);
    console.log('Rounds:', rounds);
    console.log('Is Team:', isTeam);
    console.log('Team Size:', teamSize);
    const response = await fetch(`${BACKEND_URL}/api/rooms/create`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${getJwt()}`
        },
      body: JSON.stringify({
          name: roomName,
 //         host: "",
          rounds: rounds,
          isTeam: isTeam,
          teamSize: teamSize,
          settingsLevel: settingsLevel,
          settings: settings
      }),
    });

    const json = await response.json();
    alert(json.message);
  };

  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTeamCheckboxChange = (e) => {
    setIsTeam(e.target.checked);
  };

  const handleTeamSizeChange = (e) => {
    setTeamSize(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Room</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="roomName">Room Name</label>
            <input
              type="text"
              id="roomName"
              value={roomName}
              onChange={handleRoomNameChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              placeholder="Enter room name"
            />
          </div>
          <label className="block mb-2" htmlFor="rounds">Rounds</label>
          {rounds.map((round, roundIndex) => (
            <RoundCard
              key={roundIndex}
              round={round}
              roundIndex={roundIndex}
              onRoundClick={openRoundModal}
              onRoundDelete={deleteRound}
              onRoundNameChange={handleRoundNameChange}
              onQuestionChange={handleQuestionChange}
              onQuestionAdd={addQuestion}
              onQuestionDelete={deleteQuestion}
              expanded={activeRound === roundIndex}
              onClose={closeRoundModal}
              onAnswerChange={handleAnswerChange}
              settingsLevel={settingsLevel}
              settings={settings}
              handleSettingsChange={handleSettingsChange}
            />
          ))}

          <button
            type="button"
            onClick={addRound}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Add Round
          </button>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="settingsLevel">Settings Level</label>
            <select
              id="settingsLevel"
              value={settingsLevel}
              onChange={(e) => setSettingsLevel(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            >
              <option value="room">Room</option>
              <option value="round">Round</option>
              <option value="question">Question</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="participants">Participants</label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isTeam"
                checked={isTeam}
                onChange={handleTeamCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="isTeam" className="mr-4">Teams</label>
              <input
                type="checkbox"
                id="isIndividual"
                checked={!isTeam}
                onChange={() => setIsTeam(false)}
                className="mr-2"
              />
              <label htmlFor="isIndividual">Individual Participants</label>
            </div>
          </div>
          {isTeam && (
            <div className="mb-4">
              <label className="block mb-0" htmlFor="teamSize">Team Size</label>
              <input
                type="number"
                id="teamSize"
                value={teamSize}
                onChange={handleTeamSizeChange}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                placeholder="Enter team size"
              />
            </div>
          )}
          {settingsLevel === 'room' && (
            <SettingsCard settings={settings} onSettingsChange={handleSettingsChange} />
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
