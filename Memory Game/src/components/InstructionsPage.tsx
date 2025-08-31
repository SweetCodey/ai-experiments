import React from 'react';
import { AppPage } from '../types';
import './InstructionsPage.css';

interface InstructionsPageProps {
  onNavigate: (page: AppPage) => void;
}

const InstructionsPage: React.FC<InstructionsPageProps> = ({ onNavigate }) => {
  return (
    <div className="instructions-page">
      <div className="instructions-content">
        <h1 className="instructions-title">HOW TO PLAY</h1>
        
        <div className="instructions-list">
          <div className="instruction-item">
            <div className="instruction-number">1</div>
            <div className="instruction-text">
              Click on cards to flip them and reveal the shapes underneath
            </div>
          </div>
          
          <div className="instruction-item">
            <div className="instruction-number">2</div>
            <div className="instruction-text">
              Find and match pairs of identical shapes
            </div>
          </div>
          
          <div className="instruction-item">
            <div className="instruction-number">3</div>
            <div className="instruction-text">
              Match all pairs as quickly as possible to get a high score
            </div>
          </div>
          
          <div className="instruction-item">
            <div className="instruction-number">4</div>
            <div className="instruction-text">
              Your score is based on speed and number of moves
            </div>
          </div>
        </div>
        
        <div className="instructions-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => onNavigate('game')}
          >
            START GAME
          </button>
          
          <button 
            className="btn btn-secondary"
            onClick={() => onNavigate('start')}
          >
            BACK TO HOME
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage;
