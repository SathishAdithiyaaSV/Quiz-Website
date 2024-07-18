import React, { useState } from 'react';

const SettingsCard = ({ settings, onSettingsChange, level, roundIndex, questionIndex }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (e) => {
    onSettingsChange(e, level, roundIndex, questionIndex);
  };

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {!expanded && (
        <div className="flex items-center mb-4 mt-4">
          <div className="p-4 bg-gray-600 rounded-lg flex-1 cursor-pointer" onClick={handleClick}>
            <h4 className="text-md font-bold">Settings</h4>
          </div>
        </div>
      )}
      {expanded && (
        <div className="mb-4 mt-4 p-4 bg-gray-700 rounded-lg">
          <h4 className="text-lg font-bold mb-2 cursor-pointer" onClick={handleClick}>Settings</h4>
          <div className="flex items-center mb-2">
            <label className="w-1/3" htmlFor="time">Time:</label>
            <input
              type="text"
              id="time"
              name="time"
              value={settings.time}
              onChange={handleChange}
              className="w-2/3 p-2 rounded bg-gray-600 border border-gray-500"
              placeholder="Enter time"
            />
          </div>
          <div className="flex items-center mb-2">
            <label className="w-1/3" htmlFor="points">Points:</label>
            <input
              type="number"
              id="points"
              name="points"
              value={settings.points}
              onChange={handleChange}
              className="w-2/3 p-2 rounded bg-gray-600 border border-gray-500"
              placeholder="Enter points"
            />
          </div>
          <div className="flex items-center mb-2">
            <label className="w-1/3" htmlFor="buzzer">Buzzer:</label>
            <input
              type="checkbox"
              id="buzzer"
              name="buzzer"
              checked={settings.buzzer}
              onChange={handleChange}
              className="mr-2"
            />
          </div>
          <div className="flex items-center mb-2">
            <label className="w-1/3" htmlFor="answerOnBuzz">Answer On Buzz:</label>
            <input
              type="checkbox"
              id="answerOnBuzz"
              name="answerOnBuzz"
              checked={settings.answerOnBuzz}
              onChange={handleChange}
              className="mr-2"
            />
          </div>
          <div className="flex items-center mb-2">
            <label className="w-1/3" htmlFor="answerAfterTime">Answer After Time:</label>
            <input
              type="checkbox"
              id="answerAfterTime"
              name="answerAfterTime"
              checked={settings.answerAfterTime}
              onChange={handleChange}
              className="mr-2"
            />
          </div>
          <div className="flex items-center mb-2">
            <label className="w-1/3" htmlFor="timeAfterFirstBuzz">Time After First Buzz:</label>
            <input
              type="text"
              id="timeAfterFirstBuzz"
              name="timeAfterFirstBuzz"
              value={settings.timeAfterFirstBuzz}
              onChange={handleChange}
              className="w-2/3 p-2 rounded bg-gray-600 border border-gray-500"
              placeholder="Enter time"
            />
          </div>
          <div className="flex items-center mb-2">
            <label className="w-1/3" htmlFor="timeAfterSecondBuzz">Time After Second Buzz:</label>
            <input
              type="text"
              id="timeAfterSecondBuzz"
              name="timeAfterSecondBuzz"
              value={settings.timeAfterSecondBuzz}
              onChange={handleChange}
              className="w-2/3 p-2 rounded bg-gray-600 border border-gray-500"
              placeholder="Enter time"
            />
          </div>
          <div className="flex items-center mb-2">
            <label className="w-1/3" htmlFor="timeAfterThirdBuzz">Time After Third Buzz:</label>
            <input
              type="text"
              id="timeAfterThirdBuzz"
              name="timeAfterThirdBuzz"
              value={settings.timeAfterThirdBuzz}
              onChange={handleChange}
              className="w-2/3 p-2 rounded bg-gray-600 border border-gray-500"
              placeholder="Enter time"
            />
          </div>
          <div className="flex items-center mb-2">
            <label className="w-1/3" htmlFor="equalPointsOnCorrectAnswer">Equal Points On Correct Answer:</label>
            <input
              type="checkbox"
              id="equalPointsOnCorrectAnswer"
              name="equalPointsOnCorrectAnswer"
              checked={settings.equalPointsOnCorrectAnswer}
              onChange={handleChange}
              className="mr-2"
            />
          </div>
          <div className="flex items-center mb-2">
            <label className="w-1/3" htmlFor="firstBuzzAnsweredCorrect">First Buzz Answered Correct:</label>
            <input
              type="number"
              id="firstBuzzAnsweredCorrect"
              name="firstBuzzAnsweredCorrect"
              value={settings.firstBuzzAnsweredCorrect}
              onChange={handleChange}
              className="w-2/3 p-2 rounded bg-gray-600 border border-gray-500"
              placeholder="Enter points"
            />
          </div>
          <div className="flex items-center mb-2">
            <label className="w-1/3" htmlFor="firstBuzzAnsweredIncorrect">First Buzz Answered Incorrect:</label>
            <input
              type="number"
              id="firstBuzzAnsweredIncorrect"
              name="firstBuzzAnsweredIncorrect"
              value={settings.firstBuzzAnsweredIncorrect}
              onChange={handleChange}
              className="w-2/3 p-2 rounded bg-gray-600 border border-gray-500"
              placeholder="Enter points"
            />
          </div>
          <div className="flex items-center mb-2">
            <label className="w-1/3" htmlFor="secondBuzzAnsweredCorrect">Second Buzz Answered Correct:</label>
            <input
              type="number"
              id="secondBuzzAnsweredCorrect"
              name="secondBuzzAnsweredCorrect"
              value={settings.secondBuzzAnsweredCorrect}
              onChange={handleChange}
              className="w-2/3 p-2 rounded bg-gray-600 border border-gray-500"
              placeholder="Enter points"
            />
          </div>
          <div className="flex items-center mb-2">
            <label className="w-1/3" htmlFor="secondBuzzAnsweredIncorrect">Second Buzz Answered Incorrect:</label>
            <input
              type="number"
              id="secondBuzzAnsweredIncorrect"
              name="secondBuzzAnsweredIncorrect"
              value={settings.secondBuzzAnsweredIncorrect}
              onChange={handleChange}
              className="w-2/3 p-2 rounded bg-gray-600 border border-gray-500"
              placeholder="Enter points"
            />
          </div>
          <div className="flex items-center mb-2">
            <label className="w-1/3" htmlFor="thirdBuzzAnsweredCorrect">Third Buzz Answered Correct:</label>
            <input
              type="number"
              id="thirdBuzzAnsweredCorrect"
              name="thirdBuzzAnsweredCorrect"
              value={settings.thirdBuzzAnsweredCorrect}
              onChange={handleChange}
              className="w-2/3 p-2 rounded bg-gray-600 border border-gray-500"
              placeholder="Enter points"
            />
          </div>
          <div className="flex items-center mb-2">
            <label className="w-1/3" htmlFor="thirdBuzzAnsweredIncorrect">Third Buzz Answered Incorrect:</label>
            <input
              type="number"
              id="thirdBuzzAnsweredIncorrect"
              name="thirdBuzzAnsweredIncorrect"
              value={settings.thirdBuzzAnsweredIncorrect}
              onChange={handleChange}
              className="w-2/3 p-2 rounded bg-gray-600 border border-gray-500"
              placeholder="Enter points"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsCard;
