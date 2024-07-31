import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import SettingsCard from './SettingsCard';

const RoundCard = ({
  round,
  rounds,
  setRounds,
  roundIndex,
  onRoundClick,
  onRoundDelete,
  onRoundNameChange,
  onQuestionChange,
  onQuestionAdd,
  onQuestionDelete,
  onClose,
  expanded,
  onAnswerChange,
  settingsLevel,
}) => {
  const questionTypes = ['text', 'mcq']; // Define questionTypes within the component
  const [activeQuestion, setActiveQuestion] = useState(null);
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
  
  const handleQuestionClick = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value
    }));
    var rnds = rounds;
    rnds[roundIndex].settings = settings;
    console.log(rnds);
    setRounds(rnds);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center">
        <div
          className="p-4 bg-gray-700 rounded-lg cursor-pointer flex-1"
          onClick={() => onRoundClick(roundIndex)}
        >
          <h3 className="text-lg font-bold">Round {roundIndex + 1}: {round.name || 'Unnamed Round'}</h3>
        </div>
        <button
          type="button"
          onClick={() => onRoundDelete(roundIndex)}
          className="ml-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>

      {expanded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md relative max-h-[80vh] overflow-auto">
            <button
              className="absolute top-2 right-2 text-white"
              onClick={onClose}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4">Round {roundIndex + 1} Details</h3>
            <div className="mb-4">
              <label className="block mb-2" htmlFor={`roundName-${roundIndex}`}>Round Name</label>
              <input
                type="text"
                id={`roundName-${roundIndex}`}
                value={round.name}
                onChange={(e) => onRoundNameChange(roundIndex, e)}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                placeholder="Enter round name"
              />
            </div>
            <div className="max-h-60 overflow-y-auto">
              {round.questions.map((question, questionIndex) => (
                <QuestionCard
                  key={questionIndex}
                  rounds={rounds}
                  setRounds={setRounds}
                  question={question}
                  roundIndex={roundIndex}
                  questionIndex={questionIndex}
                  onQuestionChange={onQuestionChange}
                  onQuestionDelete={onQuestionDelete}
                  onQuestionClick={handleQuestionClick}
                  expanded={activeQuestion === questionIndex}
                  onAnswerChange={onAnswerChange}
                  settingsLevel={settingsLevel}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => onQuestionAdd(roundIndex)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Add Question
            </button>
            {settingsLevel === 'round' && (
              <SettingsCard settings={settings} onSettingsChange={handleSettingsChange} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoundCard;
