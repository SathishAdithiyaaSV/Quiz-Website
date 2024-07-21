import React, { useState } from 'react';
import Quiz from './Quiz';
import Leaderboard from './Leaderboard';
import Rules from './Rules';

const QuizRoom = () => {
  const [activeComponent, setActiveComponent] = useState('Quiz');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Quiz':
        return <Quiz
        question="What is the capital of France?"
        questionType="mcq"
        points={10}
        time={30}
        buzzer={true}
        options={["Paris", "London", "Berlin", "Madrid"]}
        correctOption="Paris"
      />;
      case 'Leaderboard':
        return <Leaderboard />;
      case 'Rules':
        return <Rules />;
      default:
        return <Quiz />;
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-gray-900 text-white flex flex-col lg:flex-row">
      <div className="bg-gray-800 sg:w-full lg:w-1/8 flex lg:flex-col">
        <button
          className="w-full p-4 border-b border-gray-700 hover:bg-gray-700"
          onClick={() => setActiveComponent('Quiz')}
        >
          Quiz
        </button>
        <button
          className="w-full p-4 border-b border-gray-700 hover:bg-gray-700"
          onClick={() => setActiveComponent('Leaderboard')}
        >
          Leaderboard
        </button>
        <button
          className="w-full p-4 border-b border-gray-700 hover:bg-gray-700"
          onClick={() => setActiveComponent('Rules')}
        >
          Rules
        </button>
      </div>
      <div className="flex-1 p-4">
        {renderComponent()}
      </div>
    </div>
  );
};

export default QuizRoom;
