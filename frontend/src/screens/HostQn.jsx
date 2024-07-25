import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStar, faQuestionCircle, faBell } from '@fortawesome/free-solid-svg-icons';

const HostQn = ({ question, questionType, points, time, buzzer, options, handleShowNextQn }) => {
  const [timeLeft, setTimeLeft] = useState(getInitialTimeLeft);

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

 
  return (
    <div>
    <div className="relative bg-gray-800 p-8 rounded-lg">
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
                  className={`w-full p-2 rounded `}
                  disabled={true}
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
            disabled={true}
          />
          <button
            className="w-full p-2 mt-4 bg-blue-500 hover:bg-blue-600 rounded"
            disabled={true}
          >
            Submit
          </button>
        </div>
      )}
      {buzzer && (
        <div className="mt-4">
          <button
            className="w-full p-4 bg-red-600 hover:bg-red-700 rounded flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faBell} className="mr-2" /> Buzzer
          </button>
        </div>
      )}
    </div>
    <div className="relative bg-gray-800 p-8 rounded-lg">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Controls</h1>
      </div>
        <div className="mb-4">
          <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <button
                  className="w-full p-2 rounded "
                  onClick = {handleShowNextQn}
                >
                  Show next question
                </button>
                <button
                  className="w-full p-2 rounded "
                  disabled={true}
                >
                  Pause Quiz
                </button>
              </div>

          </div>
        </div>
    </div>
    </div>
  );
};

export default HostQn;
