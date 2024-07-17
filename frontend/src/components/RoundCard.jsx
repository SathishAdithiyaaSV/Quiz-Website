import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import SettingsCard from './SettingsCard';

const RoundCard = ({
  round,
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
  settings,
  handleSettingsChange
}) => {
  const questionTypes = ['text', 'mcq']; // Define questionTypes within the component
  const [activeQuestion, setActiveQuestion] = useState(null);
  
  const handleQuestionClick = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
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
                  question={question}
                  roundIndex={roundIndex}
                  questionIndex={questionIndex}
                  onQuestionChange={onQuestionChange}
                  onQuestionDelete={onQuestionDelete}
                  onQuestionClick={handleQuestionClick}
                  expanded={activeQuestion === questionIndex}
                  onAnswerChange={onAnswerChange}
                  settingsLevel={settingsLevel}
                  settings={settings}
                  handleSettingsChange={handleSettingsChange}
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
