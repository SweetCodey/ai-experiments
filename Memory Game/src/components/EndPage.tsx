import React, { useEffect, useState } from 'react';
import { AppPage, GameStats } from '../types';
import './EndPage.css';

interface EndPageProps {
  gameStats: GameStats;
  onPlayAgain: () => void;
  onNavigate: (page: AppPage) => void;
}

const EndPage: React.FC<EndPageProps> = ({ gameStats, onPlayAgain, onNavigate }) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPerformanceMessage = (): string => {
    if (gameStats.finalScore >= 800) return "Outstanding! 🏆";
    if (gameStats.finalScore >= 600) return "Great Job! 🌟";
    if (gameStats.finalScore >= 400) return "Well Done! 👏";
    return "Good Effort! 💪";
  };

  return (
    <div className="end-page">
      {showConfetti && (
        <div className="confetti-container">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#f7b731'][i % 5],
              }}
            />
          ))}
        </div>
      )}

      <div className="end-content">
        <div className="celebration-icons">
          <span className="icon">🎉</span>
          <span className="icon">⭐</span>
          <span className="icon">🎊</span>
        </div>

        <h1 className="victory-title">YOU WIN!</h1>
        <p className="performance-message">{getPerformanceMessage()}</p>

        <div className="final-stats">
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-info">
              <div className="stat-label">Final Score</div>
              <div className="stat-value">{gameStats.finalScore}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-info">
              <div className="stat-label">Time Taken</div>
              <div className="stat-value">{formatTime(gameStats.timeTaken)}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <div className="stat-label">Moves</div>
              <div className="stat-value">{gameStats.moves}</div>
            </div>
          </div>
        </div>

        <div className="end-buttons">
          <button 
            className="btn btn-tertiary play-again-btn"
            onClick={onPlayAgain}
          >
            PLAY AGAIN
          </button>

          <button 
            className="btn btn-secondary home-btn"
            onClick={() => onNavigate('start')}
          >
            EXIT TO HOME
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndPage;
