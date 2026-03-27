import { type GameConfig } from '../../core/types';
import questions from './data';

const countriesConfig: GameConfig = {
  id: 'countries',
  title: 'FLAGOJI',
  eyebrow: '🌍 Flag Emoji Challenge',
  tagline: 'Know Your Flags?',
  inputPlaceholder: 'Guess the country…',
  instructions: [
    ['🏳️', '25 flags, guess the country'],
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
    primary:       '#22d3ee',
    secondary:     '#4ade80',
    secondaryRgb:  '74, 222, 128',
    accent:        '#f97316',
    splashBg:      '#020d14',
    gradientBg:    ['#0a0a1a', '#0a1a2a', '#0a2a3a'],
    gradientCard:  ['#0a1e2e', '#0a2a3a'],
    gradientAccent:['#22d3ee', '#4ade80', '#38bdf8'],
    glowColor:     '#22d3ee',
    emojiHost:     '🫤',
  },
  questions,
  questionCount: 10,
  splashCards: [],
};

export default countriesConfig;
