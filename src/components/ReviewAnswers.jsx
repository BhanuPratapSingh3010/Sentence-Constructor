import React from "react";

const ReviewAnswers = ({ questions, userAnswers }) => {
  return (
    <div className="mt-8 space-y-6 max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-center">Review Answers</h3>
      {questions.map((q, index) => {
        const userFilled = userAnswers[index] || [];
        const isCorrect = JSON.stringify(userFilled) === JSON.stringify(q.correctAnswer);
        const sentenceParts = q.question.split("_____________");

        return (
          <div
            key={q.questionId}
            className="bg-white p-4 rounded-xl shadow-md border border-gray-200"
          >
            <p className="text-md mb-2 font-medium">
              Question {index + 1}
              {isCorrect ? (
                <span className="text-green-600 ml-2">Correct</span>
              ) : (
                <span className="text-red-600 ml-2">Incorrect</span>
              )}
            </p>
            <p className="text-lg flex flex-wrap leading-relaxed">
              {sentenceParts.map((part, i) => (
                <React.Fragment key={i}>
                  <span>{part}</span>
                  {i < q.correctAnswer.length && (
                    <span
                      className={`inline-block mx-1 px-2 py-1 rounded ${
                        userFilled[i] === q.correctAnswer[i]
                          ? "text-green-700 font-semibold"
                          : "text-red-600 underline"
                      }`}
                    >
                      {userFilled[i] || "____"}
                      {userFilled[i] !== q.correctAnswer[i] && (
                        <span className="ml-2 text-gray-500 text-sm">
                          (Correct: {q.correctAnswer[i]})
                        </span>
                      )}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewAnswers;
