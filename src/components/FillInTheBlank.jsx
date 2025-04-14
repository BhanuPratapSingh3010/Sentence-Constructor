import React, { useState, useEffect } from "react";

const FillInTheBlank = ({ questionData, onNext, questionIndex, totalQuestions }) => {
  const blanks = questionData.correctAnswer.length;
  const parts = questionData.question.split("_____________");

  const [selectedWords, setSelectedWords] = useState(Array(blanks).fill(null));
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    setSelectedWords(Array(blanks).fill(null));
    setHasSubmitted(false);
  }, [questionData]);

  const leftOptions = questionData.options.filter(
    (opt) => !selectedWords.includes(opt)
  );

  const handleWordClick = (word) => {
    const firstEmpty = selectedWords.findIndex((val) => val === null);
    if (firstEmpty !== -1) {
      const updated = [...selectedWords];
      updated[firstEmpty] = word;
      setSelectedWords(updated);
    }
  };

  const handleBlankClick = (i) => {
    const updated = [...selectedWords];
    updated[i] = null;
    setSelectedWords(updated);
    setHasSubmitted(false);
  };

  const resetAll = () => {
    setSelectedWords(Array(blanks).fill(null));
    setHasSubmitted(false);
  };

  const allFilled = selectedWords.every((word) => word !== null);
  const isRight = allFilled && selectedWords.every((word, i) => word === questionData.correctAnswer[i]);

  const submitAnswer = () => {
    if (allFilled) {
      setHasSubmitted(true);
      onNext(isRight, selectedWords);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8 max-w-3xl w-full">
      <h2 className="text-xl font-semibold mb-2">
        Question {questionIndex + 1} of {totalQuestions}
      </h2>

      <p className="text-lg mb-6 flex flex-wrap leading-relaxed">
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            <span>{part}</span>
            {i < blanks && (
              <span
                onClick={() => handleBlankClick(i)}
                className="inline-block min-w-[100px] mx-1 px-2 py-1 border-b-2 border-gray-400 text-blue-600 font-medium cursor-pointer"
              >
                {selectedWords[i]}
              </span>
            )}
          </React.Fragment>
        ))}
      </p>

      <div className="flex flex-wrap gap-3 mb-4">
        {leftOptions.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleWordClick(opt)}
            className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={submitAnswer}
          disabled={!allFilled}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-green-300"
        >
          Next
        </button>
        <button
          onClick={resetAll}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Reset
        </button>
      </div>

      {hasSubmitted && (
        <div className={`mt-4 text-lg font-bold ${isRight ? "text-green-600" : "text-red-600"}`}>
          {isRight ? "Correct Answer!" : "Incorrect Answer"}
        </div>
      )}
    </div>
  );
};

export default FillInTheBlank;
