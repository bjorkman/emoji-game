import { type GameConfig } from '../../core/types';
import questions from './data';

const animalsConfig: GameConfig = {
  id: 'animals',
  title: 'ANIMOJI',
  eyebrow: '🌿 Animal Emoji Challenge',
  tagline: 'Wild Guesses Only',
  inputPlaceholder: 'Name the animal…',
  instructions: [
    ['🐾', '25 animals, emoji clues only'],
    ['⌨️', 'Type the animal name, press Enter'],
    ['🏆', 'Three difficulty tiers'],
  ],
  grades: [
    { min: 100, label: '🏆 Perfect! True animal expert!' },
    { min: 80,  label: '🦁 Impressive wildlife knowledge!' },
    { min: 60,  label: '🌿 Pretty wild!' },
    { min: 40,  label: '🐾 Keep exploring!' },
    { min: 0,   label: '🥚 Back to the zoo!' },
  ],
  theme: {
    primary:      '#86efac',
    secondary:    '#fb923c',
    secondaryRgb: '251, 146, 60',
    accent:       '#fde047',
    splashBg:     '#060f04',
  },
  questions,
  splashCards: [],
};

export default animalsConfig;
