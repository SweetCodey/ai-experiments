import React from 'react';
import { Card } from '../types';
import './GameCard.css';

interface GameCardProps {
  card: Card;
  onClick: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ card, onClick }) => {
  const getEmojiElement = () => {
    return (
      <div className="card-emoji">
        {card.shape}
      </div>
    );
  };

  return (
    <div 
      className={`card ${card.isFlipped || card.isMatched ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
      onClick={onClick}
    >
      <div className="card-inner">
        <div className="card-front">
          <div className="card-back-pattern"></div>
        </div>
        <div className="card-back">
          {getEmojiElement()}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
