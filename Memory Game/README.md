# Memory Match Game

A beautiful and modern memory matching game built with Vite, TypeScript, and React featuring emoji-based cards and strategic scoring.

## Features

- **Modern UI**: Clean, colorful design with smooth animations
- **Emoji Cards**: Fun face emojis instead of geometric shapes
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Strategic Scoring**: Negative scoring system that rewards accuracy
- **Exit Confirmation**: Prevents accidental game exits with confirmation dialog
- **Visual Feedback**: Card flip animations, dimmed matched tiles, and celebration effects
- **Multiple Pages**: Start screen, game, instructions, and end screens

## How to Play

1. Click cards to flip them and reveal face emojis
2. Find matching pairs of identical emojis
3. Match all pairs as quickly as possible
4. **Be careful**: Wrong moves deduct points and can make your score negative!
5. Your final score depends on matches made, speed, and accuracy

## Game Components

- **Start Page**: Welcome screen with game title and navigation
- **Instructions Page**: How to play guide
- **Game Page**: 4x4 grid with timer, score, and move counter
- **End Page**: Victory screen with final stats and replay options

## Tech Stack

- **Vite**: Fast build tool and development server
- **React**: Component-based UI library
- **TypeScript**: Type-safe JavaScript
- **CSS3**: Modern styling with animations and gradients

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Game Mechanics

- **Grid**: 4x4 grid with 16 cards (8 pairs)
- **Emojis**: 8 different face emojis (😀, 😍, 🤔, 😎, 🥳, 😴, 🤗, 😋)
- **Scoring System**: 
  - **+100 points** per successful match
  - **-50 points** per incorrect move (can go negative!)
  - **Speed bonus** on game completion (up to +200 points)
- **Timer**: Real-time timer tracking game duration
- **Moves**: Counter for total flip attempts
- **Visual States**:
  - **Active cards**: Normal appearance with hover effects
  - **Matched cards**: Dimmed, scaled down, non-clickable appearance

## Features Implemented

✅ **Card System**: Emoji-based cards with flip animations  
✅ **Game Logic**: Match detection and visual feedback  
✅ **Scoring**: Strategic negative scoring system  
✅ **Visual Effects**: Dimmed matched tiles, hover effects  
✅ **User Experience**: Exit confirmation dialog  
✅ **Responsive Design**: Works on desktop and mobile  
✅ **Victory Screen**: Celebration effects and final stats  
✅ **Navigation**: Seamless page transitions  
✅ **Modern UI**: Clean, intuitive design  

## Scoring Strategy

- **Conservative Play**: Focus on memory and accuracy to avoid negative scores
- **Speed vs. Accuracy**: Balance quick play with careful moves
- **Recovery**: Even negative scores can be recovered with successful matches
- **Optimal Performance**: Perfect memory (16 moves) + speed = highest scores

## Recent Updates

- 🎭 **Emoji Cards**: Replaced geometric shapes with expressive face emojis
- 🎯 **Negative Scoring**: Wrong moves now deduct 50 points (can go negative)
- 🔒 **Exit Confirmation**: Added confirmation dialog to prevent accidental exits
- 👻 **Matched Tiles**: Dimmed and non-interactive appearance for completed pairs
- 📊 **Score Display**: Real-time score updates with visual indicators for negative scores

Enjoy playing Memory Match! 🎮✨

---

**Note**: Always update this README when making changes to game mechanics, features, or user interface.
