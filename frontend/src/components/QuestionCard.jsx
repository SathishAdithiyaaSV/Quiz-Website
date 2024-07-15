import React from 'react';

const QuestionCard = ({
  question,
  questionIndex,
  onQuestionDelete,
  onClose,
  onQuestionChange,
  expanded,
  onAnswerChange,
  onOptionChange,
  onAddOption,
  onDeleteOption
}) => {
  return (
    <div className="mb-2">
      <div className="flex items-center">
        <div
          className="p-4 bg-gray-600 rounded-lg cursor-pointer flex-1"
          onClick={() => onQuestionChange(questionIndex)}
        >
          <h4 className="text-md font-bold">{question.text || 'Unnamed Question'}</h4>
        </div>
        <button
          type="button"
          onClick={() => onQuestionDelete(questionIndex)}
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
            <h3 className="text-xl font-bold mb-4">Question Details</h3>
            <div className="mb-4">
              <label className="block mb-2" htmlFor={`questionText-${questionIndex}`}>Question Text</label>
              <input
                type="text"
                id={`questionText-${questionIndex}`}
                value={question.text}
                onChange={(e) => onQuestionChange(questionIndex, e)}
                className="w-full p-2 rounded bg-gray-500 border border-gray-400"
                placeholder="Enter question text"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor={`questionType-${questionIndex}`}>Question Type</label>
              <select
                id={`questionType-${questionIndex}`}
                value={question.type}
                onChange={(e) => onQuestionChange(questionIndex, { target: { name: 'type', value: e.target.value } })}
                className="w-full p-2 rounded bg-gray-500 border border-gray-400"
              >
                <option value="text">TEXT</option>
                <option value="mcq">MCQ</option>
              </select>
            </div>

            {question.type === 'mcq' && (
              <div className="mb-4">
                <label className="block mb-2">Options</label>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => onOptionChange(questionIndex, optionIndex, e)}
                      className="w-full p-2 rounded bg-gray-500 border border-gray-400"
                      placeholder={`Option ${optionIndex + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => onDeleteOption(questionIndex, optionIndex)}
                      className="ml-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => onAddOption(questionIndex)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Option
                </button>
              </div>
            )}

            {question.type === 'text' && (
              <div className="mb-4">
                <label className="block mb-2" htmlFor={`answer-${questionIndex}`}>Answer</label>
                <input
                  type="text"
                  id={`answer-${questionIndex}`}
                  value={question.answer}
                  onChange={(e) => onAnswerChange(questionIndex, e)}
                  className="w-full p-2 rounded bg-gray-500 border border-gray-400"
                  placeholder="Enter answer"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
