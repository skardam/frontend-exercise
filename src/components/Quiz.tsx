import React, { useState } from 'react';
import { QUESTIONS } from '../questions';
import Question from './Question';
import { addScore, getAverageScore } from '../storage';

const Quiz: React.FC = () => {
  const questionKeys = Object.keys(QUESTIONS).map(Number);
  const totalQuestions = questionKeys.length;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [averageScore, setAverageScore] = useState<number | null>(null);

  const handleAnswer = async (answer: boolean) => {
    if (answer) setYesCount(yesCount + 1);
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < totalQuestions) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      const score = (100 * yesCount) / totalQuestions;
      addScore(score);
      const avgScore = getAverageScore();
      setAverageScore(avgScore);
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="result">
        <p>Your score: {(100 * yesCount) / totalQuestions}</p>
        <p>Average score: {averageScore}</p>
        <button onClick={() => window.location.reload()}>Retake Quiz</button>
      </div>
    );
  }

  return (
    <div>
      <Question
        question={QUESTIONS[questionKeys[currentQuestionIndex]]}
        onAnswer={handleAnswer}
      />
    </div>
  );
};

export default Quiz;
