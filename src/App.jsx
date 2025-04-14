// App.jsx
// Main app file that controls quiz state and renders components

import { useState, useEffect } from "react";
import FillInTheBlank from "./components/FillInTheBlank";
import ReviewAnswers from "./components/ReviewAnswers";
import questions from "./data/questions";

function App() {
  // Keeps track of current question number
  const [currIndex, setCurrIndex] = useState(0);
  // Stores the user's score
  const [score, setScore] = useState(0);
  // To check whether the quiz is finished
  const [showResult, setShowResult] = useState(false);
  // Timer per question
  const [timer, setTimer] = useState(30);
  // Stores the answers user filled for review section
  const [userFilledAnswers, setUserFilledAnswers] = useState([]);

  // Countdown timer logic
  useEffect(() => {
    if (showResult) return; // stop timer if quiz ended

    if (timer === 0) {
      // Auto-submit empty answer if timer runs out
      const empty = Array(questions[currIndex].correctAnswer.length).fill(null);
      handleNext(false, empty);
      return;
    }

    const t = setTimeout(() => {
      setTimer((prev) => prev - 1); // decrease timer every second
    }, 1000);

    return () => clearTimeout(t);
  }, [timer, currIndex, showResult]);

  // When user goes to next question
  const handleNext = (isCorrect, filled = []) => {
    setUserFilledAnswers((prev) => [...prev, filled]);

    if (isCorrect) {
      setScore((prev) => prev + 1); // increase score if answer is right
    }

    if (currIndex < questions.length - 1) {
      setCurrIndex((prev) => prev + 1);
      setTimer(30); // reset timer for next question
    } else {
      setShowResult(true); // show final score and review
    }
  };

  // Restart entire quiz
  const restart = () => {
    setCurrIndex(0);
    setScore(0);
    setTimer(30);
    setShowResult(false);
    setUserFilledAnswers([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Fill in the Blanks</h1>

      {!showResult ? (
        <>
          <div className="mb-4 text-red-600 font-semibold">
            Time Left: {timer} seconds
          </div>
          <FillInTheBlank
            questionData={questions[currIndex]}
            onNext={handleNext}
            questionIndex={currIndex}
            totalQuestions={questions.length}
          />
        </>
      ) : (
        <div className="w-full text-center">
          <h2 className="text-xl font-semibold">Quiz Completed!</h2>
          <p className="mt-4">Your Score: {score} / {questions.length}</p>

          <button
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={restart}
          >
            Restart Quiz
          </button>

          <ReviewAnswers questions={questions} userAnswers={userFilledAnswers} />
        </div>
      )}
    </div>
  );
}

export default App;
