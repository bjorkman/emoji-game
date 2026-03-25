import { type GameConfig } from '../../core/types';
import questions from './data';

const countriesConfig: GameConfig = {
  id: 'countries',
  title: 'FLAGOJI',
  eyebrow: '🌍 Flag Emoji Challenge',
  tagline: 'Know Your Flags?',
  inputPlaceholder: 'Guess the country…',
  instructions: [
    ['🏳️', '40 flags, guess the country'],
    ['⌨️', 'Type your guess, press Enter'],
    ['💡', 'Hint shows first letter after 5s'],
  ],
  grades: [
    { min: 100, label: '🌍 Perfect! Flag master!' },
    { min: 80,  label: '🗺️ Excellent!' },
    { min: 60,  label: '✈️ Well-traveled!' },
    { min: 40,  label: '📚 Keep exploring!' },
    { min: 0,   label: '🌏 The world awaits!' },
  ],
  theme: {
    primary:      '#22d3ee',
    secondary:    '#4ade80',
    secondaryRgb: '74, 222, 128',
    accent:       '#f97316',
    splashBg:     '#020d14',
  },
  questions,
  questionCount: 10,
  splashCards: [],
};

export default countriesConfig;
