const STORAGE_KEY = 'quizScores';

export const getAverageScore = (): number => {
  const scores = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  if (scores.length === 0) return 0;
  const total = scores.reduce((sum: number, score: number) => sum + score, 0);
  return total / scores.length;
};

export const addScore = (score: number): void => {
  const scores = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  scores.push(score);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
};
