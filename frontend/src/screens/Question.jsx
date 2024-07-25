import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStar, faQuestionCircle, faBell } from '@fortawesome/free-solid-svg-icons';
import Confetti from 'react-confetti';

const Question = ({ question, qnNo, questionType, points, time, buzzer, options, buzzerActive, notification, socket, teamName, roomId, round, setMainTime, answeredCorrectly, answered, handleBuzzer }) => {
  const [timeLeft, setTimeLeft] = useState(getInitialTimeLeft);
  const [userAnswer, setUserAnswer] = useState('');
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
    setUserAnswer(option);
    socket.emit('submitAnswer', JSON.stringify({roomId: roomId, teamId: teamId, qnNo: qnNo, answerSubmitted: option, round: round}));
  };

  const handleTextSubmit = () => {
    setUserAnswer(textAnswer.trim().toLowerCase());
    socket.emit('submitAnswer', JSON.stringify({roomId: roomId, teamId: teamId, qnNo: qnNo, answerSubmitted: userAnswer, round: round}));
  };

  return (
    <div className="relative bg-gray-800 p-8 rounded-lg">
      {answered && answeredCorrectly && <Confetti />}
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
                    answered
                      ? answeredCorrectly
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
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
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
            onClick={ () => { setMainTime(timeLeft) ; handleBuzzer()}}
            className="w-full p-4 bg-red-600 hover:bg-red-700 rounded flex items-center justify-center"
            disabled={!buzzerActive}
          >
            <FontAwesomeIcon icon={faBell} className="mr-2" /> Buzzer
          </button>
        </div>
      )}
    </div>
  );
};

export default Question;
