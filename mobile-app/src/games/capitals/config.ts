import { type GameConfig } from '../../core/types';
import questions from './data';

const capitalsConfig: GameConfig = {
  id: 'capitals',
  title: 'CAPOJI',
  eyebrow: '🌍 World Capitals Challenge',
  tagline: 'Know Your Capitals?',
  inputPlaceholder: 'Name the capital city…',
  instructions: [
    ['🏳️', '25 countries, flag emoji clues'],
    ['⌨️', 'Type the capital city, press Enter'],
    ['🏆', 'Three difficulty tiers'],
  ],
  grades: [
    { min: 100, label: '🌍 Perfect! Geography genius!' },
    { min: 80,  label: '🗺️ Excellent world knowledge!' },
    { min: 60,  label: '✈️ Well-traveled!' },
    { min: 40,  label: '📚 Keep studying!' },
    { min: 0,   label: '🌏 The world awaits!' },
  ],
  theme: {
    primary:      '#60a5fa',
    secondary:    '#34d399',
    secondaryRgb: '52, 211, 153',
    accent:       '#fbbf24',
    splashBg:     '#020c1b',
  },
  questions,
  questionCount: 10,
  splashCards: [],
};

export default capitalsConfig;
