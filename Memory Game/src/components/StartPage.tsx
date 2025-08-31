import React from 'react';
import { AppPage } from '../types';
import './StartPage.css';

interface StartPageProps {
  onNavigate: (page: AppPage) => void;
}

const StartPage: React.FC<StartPageProps> = ({ onNavigate }) => {
  return (
    <div className="start-page">
      <div className="start-content">
        <h1 className="game-title">
          <span className="title-word">MEMORY</span>
          <span className="title-word">MATCH</span>
        </h1>
        
        <div className="button-container">
          <button 
            className="btn btn-primary start-btn"
            onClick={() => onNavigate('game')}
          >
            START GAME
          </button>
          
          <button 
            className="btn btn-secondary how-to-play-btn"
            onClick={() => onNavigate('instructions')}
          >
            HOW TO PLAY
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
