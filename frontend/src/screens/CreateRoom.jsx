import React, { useState } from 'react';
import RoundCard from '../components/RoundCard'; // Make sure to adjust the import path as needed

const CreateRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [rounds, setRounds] = useState([{ name: '', questions: [{ text: '', type: 'text', answer: '', options: [] }] }]);
  const [activeRound, setActiveRound] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Room Name:', roomName);
    console.log('Rounds:', rounds);
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

          <div className="max-h-96 overflow-y-auto mb-4">
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
              />
            ))}
          </div>

          <button
            type="button"
            onClick={addRound}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Add Round
          </button>

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
