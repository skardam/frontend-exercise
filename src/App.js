import React, { useState, useEffect } from 'react';
import { QUESTIONS } from './questions';
import './App.css';  // Import the CSS file

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [yesAnswers, setYesAnswers] = useState(0);
  const [runScore, setRunScore] = useState(null);
  const [averageScore, setAverageScore] = useState(null);

  const totalQuestions = Object.keys(QUESTIONS).length;

  useEffect(() => {
    calculateAverageScore();
  }, []);

  const handleAnswer = (answer) => {
    if (answer) setYesAnswers(yesAnswers + 1);

    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateRunScore();
    }
  };

  const calculateRunScore = () => {
    const score = (100 * yesAnswers) / totalQuestions;
    setRunScore(score);
    saveScore(score);
    calculateAverageScore();
  };

  const saveScore = (score) => {
    const scores = JSON.parse(localStorage.getItem('scores') || '[]');
    scores.push(score);
    localStorage.setItem('scores', JSON.stringify(scores));
  };

  const calculateAverageScore = () => {
    const scores = JSON.parse(localStorage.getItem('scores') || '[]');
    if (scores.length > 0) {
      const average = scores.reduce((a, b) => a + b, 0) / scores.length;
      setAverageScore(average);
    }
  };

  return (
    <div className="container">
      {runScore === null ? (
        <>
          <h1>Question {currentQuestion}</h1>
          <p>{QUESTIONS[currentQuestion]}</p>
          <button onClick={() => handleAnswer(true)}>Yes</button>
          <button onClick={() => handleAnswer(false)}>No</button>
        </>
      ) : (
        <>
          <h1>Your Score: {runScore}</h1>
          {averageScore !== null && <h2>Average Score: {averageScore.toFixed(2)}</h2>}
          <button onClick={() => window.location.reload()}>Restart</button>
        </>
      )}
    </div>
  );
};

export default App;
