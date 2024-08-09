import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const SettingsCard = ({ settings, onSettingsChange }) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    onSettingsChange({
      target: {
        name,
        value: checked,
      },
    });
  };

  return (
    <>
      {!expanded && (
        <div className="flex items-center mb-2 mt-0">
          <div className="p-4 bg-gray-600 rounded-lg flex-1 flex justify-between items-center">
            <h4 className="text-md font-bold cursor-pointer">Settings</h4>
            <button onClick={handleClick}><FontAwesomeIcon icon={faChevronDown} className="w-5 h-5"/></button>
          </div>
        </div>
      )}
      {expanded && (
        <div className="mb-2 mt-0 p-4 bg-gray-700 rounded-lg">
        <div className="flex justify-between items-center pb-4">
          <h4 className="text-lg font-bold mb-2">Settings</h4>
          <button onClick={handleClick}>
            <FontAwesomeIcon icon={faChevronUp} className="w-5 h-5" />
          </button>
        </div>
          <div className="flex items-center mb-2">
            <label className="w-1/3" htmlFor="time">Time:</label>
            <input
              type="text"
              id="time"
              name="time"
              value={settings.time}
              onChange={onSettingsChange}
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
              onChange={onSettingsChange}
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
              onChange={handleCheckboxChange}
              className="mr-2"
            />
          </div>
          {settings.buzzer && (
            <div>
          <div className="flex items-center mb-2">
            <label className="w-1/3" htmlFor="answerOnBuzz">Answer On Buzz:</label>
            <input
              type="checkbox"
              id="answerOnBuzz"
              name="answerOnBuzz"
              checked={settings.answerOnBuzz}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
          </div>
          <div className="flex items-center mb-2">
            <label className="w-1/3" htmlFor="numberOfBuzzes">Number of Buzzes:</label>
            <select
              id="numberOfBuzzes"
              name="numberOfBuzzes"
              value={settings.numberOfBuzzes}
              onChange={onSettingsChange}
              className="w-2/3 p-2 rounded bg-gray-600 border border-gray-500"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          {settings.numberOfBuzzes >= 1 && (
            <>
              <div className="flex items-center mb-2">
                <label className="w-1/3" htmlFor="timeAfterFirstBuzz">Time After First Buzz:</label>
                <input
                  type="text"
                  id="timeAfterFirstBuzz"
                  name="timeAfterFirstBuzz"
                  value={settings.timeAfterFirstBuzz}
                  onChange={onSettingsChange}
                  className="w-2/3 p-2 rounded bg-gray-600 border border-gray-500"
                  placeholder="Enter time"
                />
              </div>
              <div className="flex items-center mb-2">
                <label className="w-1/3" htmlFor="firstBuzzAnsweredCorrect">First Buzz Answered Correct:</label>
                <input
                  type="number"
                  id="firstBuzzAnsweredCorrect"
                  name="firstBuzzAnsweredCorrect"
                  value={settings.firstBuzzAnsweredCorrect}
                  onChange={onSettingsChange}
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
                  onChange={onSettingsChange}
                  className="w-2/3 p-2 rounded bg-gray-600 border border-gray-500"
                  placeholder="Enter points"
                />
              </div>
            </>
          )}
          {settings.numberOfBuzzes >= 2 && (
            <>
              <div className="flex items-center mb-2">
                <label className="w-1/3" htmlFor="timeAfterSecondBuzz">Time After Second Buzz:</label>
                <input
                  type="text"
                  id="timeAfterSecondBuzz"
                  name="timeAfterSecondBuzz"
                  value={settings.timeAfterSecondBuzz}
                  onChange={onSettingsChange}
                  className="w-2/3 p-2 rounded bg-gray-600 border border-gray-500"
                  placeholder="Enter time"
                />
              </div>
              <div className="flex items-center mb-2">
                <label className="w-1/3" htmlFor="secondBuzzAnsweredCorrect">Second Buzz Answered Correct:</label>
                <input
                  type="number"
                  id="secondBuzzAnsweredCorrect"
                  name="secondBuzzAnsweredCorrect"
                  value={settings.secondBuzzAnsweredCorrect}
                  onChange={onSettingsChange}
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
                  onChange={onSettingsChange}
                  className="w-2/3 p-2 rounded bg-gray-600 border border-gray-500"
                  placeholder="Enter points"
                />
              </div>
            </>
          )}
          {settings.numberOfBuzzes >= 3 && (
            <>
              <div className="flex items-center mb-2">
                <label className="w-1/3" htmlFor="timeAfterThirdBuzz">Time After Third Buzz:</label>
                <input
                  type="text"
                  id="timeAfterThirdBuzz"
                  name="timeAfterThirdBuzz"
                  value={settings.timeAfterThirdBuzz}
                  onChange={onSettingsChange}
                  className="w-2/3 p-2 rounded bg-gray-600 border border-gray-500"
                  placeholder="Enter time"
                />
              </div>
              <div className="flex items-center mb-2">
                <label className="w-1/3" htmlFor="thirdBuzzAnsweredCorrect">Third Buzz Answered Correct:</label>
                <input
                  type="number"
                  id="thirdBuzzAnsweredCorrect"
                  name="thirdBuzzAnsweredCorrect"
                  value={settings.thirdBuzzAnsweredCorrect}
                  onChange={onSettingsChange}
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
                  onChange={onSettingsChange}
                  className="w-2/3 p-2 rounded bg-gray-600 border border-gray-500"
                  placeholder="Enter points"
                />
              </div>
            </>
          )}
          </div>
        )}
        </div>
      )}
    </>
  );
};

export default SettingsCard;
