import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStar, faQuestionCircle, faBell } from '@fortawesome/free-solid-svg-icons';
import Confetti from 'react-confetti';

const Quiz = ({ question, questionType, points, time, buzzer, options, correctOption }) => {
  const [timeLeft, setTimeLeft] = useState(getInitialTimeLeft);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [textAnswer, setTextAnswer] = useState('');
  const [isBuzzerPressed, setIsBuzzerPressed] = useState(false);

  function getInitialTimeLeft() {
    const storedStartTime = localStorage.getItem('startTime');
    if (storedStartTime) {
      const elapsedTime = Math.floor((Date.now() - parseInt(storedStartTime)) / 1000);
      return Math.max(time - elapsedTime, 0);
    }
    return time;
  }

  useEffect(() => {
    if (!localStorage.getItem('startTime')) {
      localStorage.setItem('startTime', Date.now().toString());
    }

    const interval = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - parseInt(localStorage.getItem('startTime'))) / 1000);
      setTimeLeft(Math.max(time - elapsedTime, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const elapsedTime = Math.floor((Date.now() - parseInt(localStorage.getItem('startTime'))) / 1000);
        setTimeLeft(Math.max(time - elapsedTime, 0));
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [time]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === correctOption) {
      setIsCorrect(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
    } else {
      setIsCorrect(false);
    }
  };

  const handleBuzzer = () => {
    setIsBuzzerPressed(true);
  };

  const handleTextSubmit = () => {
    if (textAnswer.trim().toLowerCase() === correctOption.trim().toLowerCase()) {
      setIsCorrect(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="relative bg-gray-800 p-8 rounded-lg">
      {showConfetti && <Confetti />}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Quiz</h1>
      </div>
      <div className="mb-4">
        <p className="text-xl flex items-center">
          <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" /> 
          {question}
        </p>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faStar} className="mr-2 text-yellow-500" />
          <p>{points}</p>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faClock} className="mr-2 text-gray-400" />
          <p>{timeLeft}s</p>
        </div>
      </div>
      {questionType === 'mcq' && (
        <div className="mb-4">
          <p className="flex items-center">
            <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" /> 
            Question Type: Multiple Choice
          </p>
          <div className="flex flex-wrap -mx-2">
            {options.map((option, index) => (
              <div key={index} className="w-full md:w-1/2 px-2 mb-4">
                <button
                  className={`w-full p-2 rounded ${
                    selectedOption === option
                      ? isCorrect
                        ? 'bg-green-500'
                        : 'bg-red-500'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                  onClick={() => handleOptionClick(option)}
                  disabled={!isBuzzerPressed}
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {questionType === 'text' && (
        <div className="mb-4">
          <p className="flex items-center">
            <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" /> 
            Question Type: Text
          </p>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            placeholder="Type your answer here..."
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            disabled={!isBuzzerPressed}
          />
          <button
            className="w-full p-2 mt-4 bg-blue-500 hover:bg-blue-600 rounded"
            onClick={handleTextSubmit}
            disabled={!isBuzzerPressed}
          >
            Submit
          </button>
        </div>
      )}
      {buzzer && (
        <div className="mt-4">
          <button
            onClick={handleBuzzer}
            className="w-full p-4 bg-red-600 hover:bg-red-700 rounded flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faBell} className="mr-2" /> Buzzer
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
