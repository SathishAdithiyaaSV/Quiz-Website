import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStar, faQuestionCircle, faBell, faForward, faPause } from '@fortawesome/free-solid-svg-icons';
import Notification from '../components/Notification';

const HostQn = ({ question, qnNo, questionType, points, time, isPaused, buzzer, options, handleShowNextQn, timeLeft, setTimeLeft, notification }) => {

  useEffect(() => {
    <Notification message={notification} />
  }, [notification]);

  useEffect(() => {
    if (!localStorage.getItem('startTime')) {
      localStorage.setItem('startTime', Date.now().toString());
    }

    const interval = setInterval(() => {
      if (!isPaused) {
        const elapsedTime = Math.floor((Date.now() - parseInt(localStorage.getItem('startTime'))) / 1000);
        setTimeLeft(Math.max(time - elapsedTime, 0));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time, isPaused]);

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
  }, [time, isPaused]);

  return (
    <div className="relative bg-gray-800 p-8 rounded-lg">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Question {qnNo}</h1>
        <div className="flex space-x-4">
          <button onClick={handleShowNextQn} className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full">
            <FontAwesomeIcon icon={faForward} className="text-white" />
          </button>
        </div>
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
                  className={`w-full p-2 rounded bg-blue-500`}
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
  );
};

export default HostQn;
