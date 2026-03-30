import { type GameConfig } from '../../core/types';
import questions from './data';

const sanrioConfig: GameConfig = {
  id: 'sanrio',
  title: 'SANMOJI',
  eyebrow: '🎀 Sanrio Emoji Challenge',
  tagline: 'Kawaii or Nah?',
  inputPlaceholder: 'Guess the character\u2026',
  instructions: [
    ['🃏', '20 characters, emoji clues only'],
    ['⌨️', 'Type your guess, press Enter'],
    ['🏆', 'Three difficulty tiers'],
  ],
  grades: [
    { min: 100, label: '🏆 Perfect!' },
    { min: 80,  label: '🌟 Amazing!' },
    { min: 60,  label: '👍 Good job!' },
    { min: 40,  label: '😅 Keep practicing!' },
    { min: 0,   label: '💪 Don\'t give up!' },
  ],
  theme: {
    primary:       '#f9a8d4',
    secondary:     '#c4b5fd',
    secondaryRgb:  '196, 181, 253',
    accent:        '#fda4af',
    splashBg:      '#100810',
    gradientBg:    ['#1a0a18', '#2a1028', '#3a1838'],
    gradientCard:  ['#2a1428', '#1e0c20'],
    gradientAccent:['#f9a8d4', '#c4b5fd', '#fda4af'],
    glowColor:     '#f9a8d4',
    emojiHost:     '🥺',
  },
  questions,
  questionCount: 8,
  splashCards: [
    { name: "Hello Kitty",       img: "/sanrio/hellokitty.jpg" },
    { name: "Cinnamoroll",       img: "/sanrio/cinnamoroll.jpg" },
    { name: "My Melody",         img: "/sanrio/mymelody.jpg" },
    { name: "Kuromi",            img: "/sanrio/kuromi.jpg" },
    { name: "Pompompurin",       img: "/sanrio/pompompurin.jpg" },
    { name: "Keroppi",           img: "/sanrio/keroppi.jpg" },
    { name: "Gudetama",          img: "/sanrio/gudetama.jpg" },
    { name: "Aggretsuko",        img: "/sanrio/aggretsuko.jpg" },
    { name: "Little Twin Stars", img: "/sanrio/littletwinstars.jpg" },
    { name: "Badtz-Maru",        img: "/sanrio/badtzmaru.jpg" },
    { name: "Tuxedosam",         img: "/sanrio/tuxedosam.jpg" },
    { name: "Chococat",          img: "/sanrio/chococat.jpg" },
  ],
};

export default sanrioConfig;
