import { type GameConfig } from '../../core/types';
import questions from './data';

const moviesConfig: GameConfig = {
  id: 'movies',
  title: 'FILMOJI',
  eyebrow: '🎬 Movie Emoji Challenge',
  tagline: 'Guess the Film!',
  inputPlaceholder: 'Guess the movie…',
  instructions: [
    ['🎬', '25 movies, emoji clues only'],
    ['⌨️', 'Type your guess, press Enter'],
    ['🏆', 'Three difficulty tiers'],
  ],
  grades: [
    { min: 100, label: '🏆 Perfect! Movie genius!' },
    { min: 80,  label: '🎬 Outstanding!' },
    { min: 60,  label: '🍿 Pretty good!' },
    { min: 40,  label: '📽️ Keep watching!' },
    { min: 0,   label: '🎥 Lights, camera, try again!' },
  ],
  theme: {
    primary:       '#f59e0b',
    secondary:     '#a855f7',
    secondaryRgb:  '168, 85, 247',
    accent:        '#ec4899',
    splashBg:      '#0d0510',
    gradientBg:    ['#1a0a0a', '#2a0a1a', '#3a0a2a'],
    gradientCard:  ['#2a1020', '#1e0818'],
    gradientAccent:['#f59e0b', '#a855f7', '#ec4899'],
    glowColor:     '#f59e0b',
    emojiHost:     '🤨',
  },
  questions,
  questionCount: 10,
  splashCards: [],
};

export default moviesConfig;
