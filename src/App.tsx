import React from 'react';
import Quiz from './components/Quiz';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <div>
        <h1>Yes/No Quiz</h1>
        <Quiz />
      </div>
    </div>
  );
};

export default App;
