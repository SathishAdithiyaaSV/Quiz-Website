import React from 'react';

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
  onAnswerChange
}) => {
  const questionTypes = ['text', 'mcq'];

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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md relative">
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
            {round.questions.map((question, questionIndex) => (
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
                  <button
                    type="button"
                    onClick={() => onQuestionDelete(roundIndex, questionIndex)}
                    className="ml-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
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
              </div>
            ))}
            <button
              type="button"
              onClick={() => onQuestionAdd(roundIndex)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Add Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoundCard;
