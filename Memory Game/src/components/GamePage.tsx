import React, { useState, useEffect, useCallback } from 'react';
import { Card, GameState, AppPage, GameStats, BonusGrid } from '../types';
import GameCard from './GameCard';
import './GamePage.css';

interface GamePageProps {
  onGameComplete: (stats: GameStats) => void;
  onNavigate: (page: AppPage) => void;
}

const EMOJIS = ['😀', '😍', '🤔', '😎', '🥳', '😴', '🤗', '😋'];
const BONUS_EMOJIS = ['🎯', '⭐', '🎪', '🎨', '🎭'];

const createInitialCards = (): Card[] => {
  const cards: Card[] = [];
  let id = 0;

  // Create 8 pairs (16 cards total) for 4x4 grid
  for (let i = 0; i < 8; i++) {
    const emoji = EMOJIS[i];
    
    // Create two identical cards (a pair)
    cards.push({
      id: id++,
      shape: emoji,
      color: '', // Not needed for emojis
      isFlipped: false,
      isMatched: false,
    });
    
    cards.push({
      id: id++,
      shape: emoji,
      color: '', // Not needed for emojis
      isFlipped: false,
      isMatched: false,
    });
  }

  // Shuffle the cards
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
};

const createBonusGridCards = (): Card[] => {
  const cards: Card[] = [];
  let id = 1000; // Start with high ID to avoid conflicts

  // Create 2 pairs (4 cards total) for 2x2 grid
  for (let i = 0; i < 2; i++) {
    const emoji = BONUS_EMOJIS[i];
    
    // Create two identical cards (a pair)
    cards.push({
      id: id++,
      shape: emoji,
      color: '',
      isFlipped: false,
      isMatched: false,
    });
    
    cards.push({
      id: id++,
      shape: emoji,
      color: '',
      isFlipped: false,
      isMatched: false,
    });
  }

  // Shuffle the cards
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
};

const GamePage: React.FC<GamePageProps> = ({ onGameComplete, onNavigate }) => {
  const [gameState, setGameState] = useState<GameState>({
    cards: createInitialCards(),
    flippedCards: [],
    moves: 0,
    incorrectMoves: 0,
    timer: 0,
    isGameComplete: false,
    score: 0,
    consecutiveMatches: 0,
    bonusGrid: null,
    isMainGamePaused: false,
  });

  const [showExitConfirmation, setShowExitConfirmation] = useState(false);

  const calculateScore = useCallback((matches: number, incorrectMoves: number, time: number, bonusPoints: number = 0): number => {
    // Scoring system:
    // - Base points per match: 100 points
    // - Penalty for incorrect moves: -50 points per wrong guess
    // - Speed bonus: extra points for faster completion
    // - Bonus grid points: extra points from bonus grid matches
    
    const basePoints = matches * 100; // 100 points per match
    const incorrectPenalty = incorrectMoves * 50; // 50 points deducted per wrong move
    
    // Speed bonus: reward for faster play (bonus decreases over time)
    // Give bonus points that decrease as time increases, but only when game is complete
    const speedBonus = matches === 8 ? Math.max(0, 200 - Math.floor(time / 5)) : 0;
    
    // Score can go negative
    return basePoints - incorrectPenalty + speedBonus + bonusPoints;
  }, []);

  const createBonusGrid = useCallback((): BonusGrid => {
    return {
      cards: createBonusGridCards(),
      flippedCards: [],
      isActive: true,
      timeRemaining: 7,
      matches: 0,
    };
  }, []);

  // Timer effect - pause main timer during bonus grid
  useEffect(() => {
    if (!gameState.isGameComplete && !gameState.isMainGamePaused) {
      const interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timer: prev.timer + 1,
        }));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameState.isGameComplete, gameState.isMainGamePaused]);

  // Bonus grid timer effect
  useEffect(() => {
    if (gameState.bonusGrid?.isActive) {
      const interval = setInterval(() => {
        setGameState(prev => {
          if (!prev.bonusGrid || prev.bonusGrid.timeRemaining <= 0) {
            return {
              ...prev,
              bonusGrid: null,
              isMainGamePaused: false,
            };
          }
          
          return {
            ...prev,
            bonusGrid: {
              ...prev.bonusGrid,
              timeRemaining: prev.bonusGrid.timeRemaining - 1,
            },
          };
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameState.bonusGrid?.isActive]);

  // Check for matches effect
  useEffect(() => {
    if (gameState.flippedCards.length === 2) {
      const [first, second] = gameState.flippedCards;
      
      if (first.shape === second.shape) {
        // Match found
        setTimeout(() => {
          setGameState(prev => {
            const newCards = prev.cards.map(card => 
              card.id === first.id || card.id === second.id
                ? { ...card, isMatched: true }
                : card
            );
            const newMoves = prev.moves + 1;
            const matchedCount = newCards.filter(card => card.isMatched).length / 2; // Pairs
            const newConsecutiveMatches = prev.consecutiveMatches + 1;
            
            // Calculate bonus points from existing bonus grid
            const bonusPoints = prev.bonusGrid ? prev.bonusGrid.matches * 150 : 0;
            const newScore = calculateScore(matchedCount, prev.incorrectMoves, prev.timer, bonusPoints);
            
            // Check if we should trigger bonus grid (2 consecutive matches and no active bonus grid)
            const shouldTriggerBonusGrid = newConsecutiveMatches === 2 && !prev.bonusGrid && matchedCount < 8;
            
            return {
              ...prev,
              cards: newCards,
              flippedCards: [],
              moves: newMoves,
              score: newScore,
              consecutiveMatches: newConsecutiveMatches,
              bonusGrid: shouldTriggerBonusGrid ? createBonusGrid() : prev.bonusGrid,
              isMainGamePaused: shouldTriggerBonusGrid ? true : prev.isMainGamePaused,
            };
          });
        }, 1000);
      } else {
        // No match - reset consecutive matches and increment incorrect moves
        setTimeout(() => {
          setGameState(prev => {
            const newMoves = prev.moves + 1;
            const newIncorrectMoves = prev.incorrectMoves + 1;
            const matchedCount = prev.cards.filter(card => card.isMatched).length / 2; // Pairs
            
            // Calculate bonus points from existing bonus grid
            const bonusPoints = prev.bonusGrid ? prev.bonusGrid.matches * 150 : 0;
            const newScore = calculateScore(matchedCount, newIncorrectMoves, prev.timer, bonusPoints);
            
            return {
              ...prev,
              cards: prev.cards.map(card => 
                card.id === first.id || card.id === second.id
                  ? { ...card, isFlipped: false }
                  : card
              ),
              flippedCards: [],
              moves: newMoves,
              incorrectMoves: newIncorrectMoves,
              score: newScore,
              consecutiveMatches: 0, // Reset consecutive matches on miss
            };
          });
        }, 1000);
      }
    }
  }, [gameState.flippedCards, calculateScore, createBonusGrid]);

  // Check for bonus grid matches
  useEffect(() => {
    if (gameState.bonusGrid?.flippedCards.length === 2) {
      const [first, second] = gameState.bonusGrid.flippedCards;
      
      if (first.shape === second.shape) {
        // Bonus grid match found
        setTimeout(() => {
          setGameState(prev => {
            if (!prev.bonusGrid) return prev;
            
            const newBonusCards = prev.bonusGrid.cards.map(card => 
              card.id === first.id || card.id === second.id
                ? { ...card, isMatched: true }
                : card
            );
            const newBonusMatches = prev.bonusGrid.matches + 1;
            
            // Update score with new bonus points
            const matchedCount = prev.cards.filter(card => card.isMatched).length / 2;
            const bonusPoints = newBonusMatches * 150;
            const newScore = calculateScore(matchedCount, prev.incorrectMoves, prev.timer, bonusPoints);
            
            return {
              ...prev,
              bonusGrid: {
                ...prev.bonusGrid,
                cards: newBonusCards,
                flippedCards: [],
                matches: newBonusMatches,
              },
              score: newScore,
            };
          });
        }, 1000);
      } else {
        // No match in bonus grid
        setTimeout(() => {
          setGameState(prev => {
            if (!prev.bonusGrid) return prev;
            
            return {
              ...prev,
              bonusGrid: {
                ...prev.bonusGrid,
                cards: prev.bonusGrid.cards.map(card => 
                  card.id === first.id || card.id === second.id
                    ? { ...card, isFlipped: false }
                    : card
                ),
                flippedCards: [],
              },
            };
          });
        }, 1000);
      }
    }
  }, [gameState.bonusGrid?.flippedCards, calculateScore]);

  // Check for game completion
  useEffect(() => {
    const allMatched = gameState.cards.every(card => card.isMatched);
    if (allMatched && gameState.cards.length > 0 && !gameState.isGameComplete) {
      setGameState(prev => ({ ...prev, isGameComplete: true }));
      
      const finalStats: GameStats = {
        finalScore: gameState.score,
        timeTaken: gameState.timer,
        moves: gameState.moves,
      };
      
      setTimeout(() => {
        onGameComplete(finalStats);
      }, 1500);
    }
  }, [gameState.cards, gameState.isGameComplete, gameState.score, gameState.timer, gameState.moves, onGameComplete]);

  const handleCardClick = (cardId: number) => {
    // Don't allow main game clicks during bonus grid or if already 2 cards flipped
    if (gameState.isMainGamePaused || gameState.flippedCards.length >= 2) return;
    
    const card = gameState.cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    setGameState(prev => ({
      ...prev,
      cards: prev.cards.map(c => 
        c.id === cardId ? { ...c, isFlipped: true } : c
      ),
      flippedCards: [...prev.flippedCards, card],
    }));
  };

  const handleBonusCardClick = (cardId: number) => {
    if (!gameState.bonusGrid || gameState.bonusGrid.flippedCards.length >= 2) return;
    
    const card = gameState.bonusGrid.cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    setGameState(prev => {
      if (!prev.bonusGrid) return prev;
      
      return {
        ...prev,
        bonusGrid: {
          ...prev.bonusGrid,
          cards: prev.bonusGrid.cards.map(c => 
            c.id === cardId ? { ...c, isFlipped: true } : c
          ),
          flippedCards: [...prev.bonusGrid.flippedCards, card],
        },
      };
    });
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBackClick = () => {
    setShowExitConfirmation(true);
  };

  const handleConfirmExit = () => {
    setShowExitConfirmation(false);
    onNavigate('start');
  };

  const handleCancelExit = () => {
    setShowExitConfirmation(false);
  };

  return (
    <div className="game-page">
      <div className="game-header">
        <button 
          className="btn btn-secondary back-btn"
          onClick={handleBackClick}
        >
          ← BACK
        </button>
        
        <div className="game-stats">
          <div className="stat">
            <span className="stat-label">Time</span>
            <span className="stat-value">{formatTime(gameState.timer)}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Score</span>
            <span className="stat-value" style={{ color: gameState.score < 0 ? '#ff4757' : '#333' }}>
              {gameState.score}
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">Moves</span>
            <span className="stat-value">{gameState.moves}</span>
          </div>
        </div>
      </div>

      <div className="game-grid">
        {gameState.cards.map((card) => (
          <GameCard
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>

      {gameState.bonusGrid && (
        <div className="bonus-grid-container">
          <div className="bonus-grid-header">
            <h3>🎯 BONUS CHALLENGE!</h3>
            <div className="bonus-timer">
              Time: {gameState.bonusGrid.timeRemaining}s
            </div>
            <div className="bonus-score">
              Bonus Points: {gameState.bonusGrid.matches * 150}
            </div>
          </div>
          <div className="bonus-grid">
            {gameState.bonusGrid.cards.map((card) => (
              <GameCard
                key={card.id}
                card={card}
                onClick={() => handleBonusCardClick(card.id)}
              />
            ))}
          </div>
        </div>
      )}

      {gameState.isGameComplete && (
        <div className="game-complete-overlay">
          <div className="completion-message">
            <h2>🎉 CONGRATULATIONS! 🎉</h2>
            <p>You completed the game!</p>
          </div>
        </div>
      )}

      {showExitConfirmation && (
        <div className="exit-confirmation-overlay">
          <div className="exit-confirmation-dialog">
            <h3>Exit Game?</h3>
            <p>Are you sure you want to exit? Your progress will be lost.</p>
            <div className="confirmation-buttons">
              <button 
                className="btn btn-danger"
                onClick={handleConfirmExit}
              >
                Yes, Exit
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleCancelExit}
              >
                Continue Playing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
