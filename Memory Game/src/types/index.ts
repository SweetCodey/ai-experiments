export interface Card {
  id: number;
  shape: string;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface BonusGrid {
  cards: Card[];
  flippedCards: Card[];
  isActive: boolean;
  timeRemaining: number;
  matches: number;
}

export interface GameState {
  cards: Card[];
  flippedCards: Card[];
  moves: number;
  incorrectMoves: number;
  timer: number;
  isGameComplete: boolean;
  score: number;
  consecutiveMatches: number;
  bonusGrid: BonusGrid | null;
  isMainGamePaused: boolean;
}

export type AppPage = 'start' | 'game' | 'end' | 'instructions';

export interface GameStats {
  finalScore: number;
  timeTaken: number;
  moves: number;
}
