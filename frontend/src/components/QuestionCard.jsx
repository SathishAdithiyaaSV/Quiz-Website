import React, {useState, useEffect} from 'react';
import SettingsCard from './SettingsCard';

const QuestionCard = ({
  rounds,
  setRounds,
  question,
  roundIndex,
  questionIndex,
  onQuestionDelete,
  onQuestionChange,
  onQuestionClick,
  expanded,
  onAnswerChange,
  settingsLevel,
}) => {
  const questionTypes = ['text', 'mcq']; // Define questionTypes within the component
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

  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  useEffect(() => {
    var rnds = rounds;
    rnds[roundIndex].questions[questionIndex].settings = settings;
    setRounds(rnds);
  },[settings]);

  return (
    <div className="mb-2">
      <div className="flex items-center">
        <div
          className="p-4 bg-gray-600 rounded-lg cursor-pointer flex-1"
          onClick={() => onQuestionClick(questionIndex)}
        >
          <h4 className="text-md font-bold">Question {questionIndex + 1 || 'Unnamed Question'}</h4>
        </div>
        <button
          type="button"
          onClick={() => onQuestionDelete(roundIndex, questionIndex)}
          className="ml-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>

      {expanded && (
        <div key={questionIndex} className="mb-2 flex flex-col bg-gray-600 p-4 rounded">
          <div className="flex items-center mb-2">
            <input
              type="text"
              id={`question-${roundIndex}-${questionIndex}`}
              value={question.text}
              onChange={(e) => onQuestionChange(roundIndex, questionIndex, e)}
              className="w-full p-2 rounded bg-gray-500 border border-gray-400"
              placeholder="Enter question"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2" htmlFor={`questionType-${roundIndex}-${questionIndex}`}>Question Type</label>
            <select
              id={`questionType-${roundIndex}-${questionIndex}`}
              value={question.type}
              onChange={(e) => onQuestionChange(roundIndex, questionIndex, { target: { name: 'type', value: e.target.value } })}
              className="w-full p-2 rounded bg-gray-500 border border-gray-400"
            >
              {questionTypes.map((type) => (
                <option key={type} value={type}>{type.toUpperCase()}</option>
              ))}
            </select>
          </div>
          {question.type === 'text' && (
            <div className="mb-2">
              <label className="block mb-2" htmlFor={`answer-${roundIndex}-${questionIndex}`}>Answer</label>
              <input
                type="text"
                id={`answer-${roundIndex}-${questionIndex}`}
                value={question.answer}
                onChange={(e) => onAnswerChange(roundIndex, questionIndex, e)}
                className="w-full p-2 rounded bg-gray-500 border border-gray-400"
                placeholder="Enter answer"
              />
            </div>
          )}
          {question.type === 'mcq' && (
            <div className="mb-2">
              <label className="block mb-2" htmlFor={`options-${roundIndex}-${questionIndex}`}>Options</label>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center mb-1">
                  <input
                    type="text"
                    id={`option-${roundIndex}-${questionIndex}-${optionIndex}`}
                    value={option}
                    onChange={(e) => onQuestionChange(roundIndex, questionIndex, { target: { name: 'options', value: e.target.value, optionIndex } })}
                    className="w-full p-2 rounded bg-gray-500 border border-gray-400"
                    placeholder={`Option ${optionIndex + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => onQuestionChange(roundIndex, questionIndex, { target: { name: 'deleteOption', optionIndex } })}
                    className="ml-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => onQuestionChange(roundIndex, questionIndex, { target: { name: 'addOption' } })}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Option
              </button>
              <label className="block mb-2 mt-2" htmlFor={`answer-${roundIndex}-${questionIndex}`}>Answer</label>
              <input
                type="text"
                id={`answer-${roundIndex}-${questionIndex}`}
                value={question.answer}
                onChange={(e) => onAnswerChange(roundIndex, questionIndex, e)}
                className="w-full p-2 rounded bg-gray-500 border border-gray-400"
                placeholder="Enter answer"
              />
            </div>
          )}
          {settingsLevel === 'question' && (
            <SettingsCard settings={settings} onSettingsChange={handleSettingsChange} />
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
