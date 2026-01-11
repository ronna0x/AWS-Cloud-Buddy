import { useState, useEffect } from "react";
const questions = [
  {
    question: "What planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "Which language is used to style web pages?",
    options: ["HTML", "Java", "CSS", "Python"],
    answer: "CSS",
  },
  {
    question: "What does CPU stand for?",
    options: [
      "Central Processing Unit",
      "Computer Personal Unit",
      "Central Performance Utility",
      "Control Processing User",
    ],
    answer: "Central Processing Unit",
  },
];

const TIME_PER_QUESTION = 10;

export default function Game() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);

  // Timer logic
  useEffect(() => {
    if (showScore) return;

    if (timeLeft === 0) {
      goToNextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showScore]);

  function handleAnswerClick(option) {
    setSelectedOption(option);
    const isCorrect = option === questions[currentQuestion].answer;
    setAnswerStatus(isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Wait for the user to see feedback before going to the next question
    setTimeout(() => goToNextQuestion(), 1000);
  }

  function goToNextQuestion() {
    const next = currentQuestion + 1;
    if (next < questions.length) {
      setCurrentQuestion(next);
      setTimeLeft(TIME_PER_QUESTION);
      setSelectedOption(null);
      setAnswerStatus(null);
    } else {
      setShowScore(true);
    }
  }

  function restartQuiz() {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimeLeft(TIME_PER_QUESTION);
    setSelectedOption(null);
    setAnswerStatus(null);
  }

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      {showScore ? (
        <>
          <h2>Quiz Complete 🎉</h2>
          <p>
            You scored <strong>{score}</strong> out of{" "}
            <strong>{questions.length}</strong>
          </p>
          <button className="restart-btn" onClick={restartQuiz}>
            Restart Quiz
          </button>
        </>
      ) : (
        <>
          <div className="quiz-header">
            <span>
              Question {currentQuestion + 1}/{questions.length}
            </span>
            <span className="timer">⏱️ {timeLeft}s</span>
          </div>

          <h2>{questions[currentQuestion].question}</h2>

          <div className="progress-bar">
            <div
              className="progress-bar-filled"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="options">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option}
                className={`option-btn ${
                  selectedOption === option
                    ? answerStatus
                    : ""
                }`}
                onClick={() => handleAnswerClick(option)}
                disabled={selectedOption !== null}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
