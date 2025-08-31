import { useState } from 'react';
import StartPage from './components/StartPage';
import GamePage from './components/GamePage';
import EndPage from './components/EndPage';
import InstructionsPage from './components/InstructionsPage';
import { AppPage, GameStats } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('start');
  const [gameStats, setGameStats] = useState<GameStats>({
    finalScore: 0,
    timeTaken: 0,
    moves: 0
  });

  const handlePageChange = (page: AppPage) => {
    setCurrentPage(page);
  };

  const handleGameComplete = (stats: GameStats) => {
    setGameStats(stats);
    setCurrentPage('end');
  };

  const resetGame = () => {
    setCurrentPage('start');
    setGameStats({
      finalScore: 0,
      timeTaken: 0,
      moves: 0
    });
  };

  return (
    <div className="app">
      {/* Background decorations */}
      <div className="background-decoration decoration-1"></div>
      <div className="background-decoration decoration-2"></div>
      <div className="background-decoration decoration-3"></div>
      <div className="background-decoration decoration-4"></div>

      {currentPage === 'start' && (
        <StartPage onNavigate={handlePageChange} />
      )}
      
      {currentPage === 'instructions' && (
        <InstructionsPage onNavigate={handlePageChange} />
      )}
      
      {currentPage === 'game' && (
        <GamePage onGameComplete={handleGameComplete} onNavigate={handlePageChange} />
      )}
      
      {currentPage === 'end' && (
        <EndPage 
          gameStats={gameStats} 
          onPlayAgain={resetGame}
          onNavigate={handlePageChange}
        />
      )}
    </div>
  );
}

export default App;
