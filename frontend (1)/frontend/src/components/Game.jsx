import { useState, useEffect } from "react";

const TIME_PER_QUESTION = 15;

export default function Game({
  random10,
  setCn, cn
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  
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
  }, [timeLeft, showScore, cn]);

  function handleAnswerClick(option) {
    setSelectedOption(option);
    const isCorrect = option === random10[currentQuestion].answer;
    setAnswerStatus(isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
      setScore(score + 1);
    }
    
    
    setTimeout(() => goToNextQuestion(), 1000);
  }

  function goToNextQuestion() {
    const next = currentQuestion + 1;
    if (next < random10.length) {
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
    setCn((prev) => prev + 1);
    
  }

  const progressPercentage = ((currentQuestion + 1) / random10.length) * 100;

  return (
    <div className="quiz-container">
      {showScore ? (
        <>
          <h2>Quiz Complete 🎉</h2>
          <p>
            You scored <strong>{score}</strong> out of{" "}
            <strong>{random10.length}</strong>
          </p>
          <button className="restart-btn" onClick={restartQuiz}>
            Restart Quiz
          </button>
        </>
      ) : (
        <>
          <div className="quiz-header">
            <span>
              Question {currentQuestion + 1}/{random10.length}
            </span>
            <span className="timer">⏱️ {timeLeft}s</span>
          </div>

          <h2>{random10[currentQuestion].question}</h2>

          <div className="progress-bar">
            <div
              className="progress-bar-filled"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="options">
            {random10[currentQuestion].options.map((option) => (
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
