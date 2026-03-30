import { type GameConfig } from '../../core/types';
import questions from './data';

const zodiacConfig: GameConfig = {
  id: 'zodiac',
  title: 'STARMOJI',
  eyebrow: '♈ Zodiac Emoji Challenge',
  tagline: "What's Your Sign?",
  inputPlaceholder: 'Guess the sign\u2026',
  instructions: [
    ['🃏', '24 signs, emoji clues only'],
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
    primary:       '#a78bfa',
    secondary:     '#f472b6',
    secondaryRgb:  '244, 114, 182',
    accent:        '#818cf8',
    splashBg:      '#080816',
    gradientBg:    ['#0e0e2a', '#1a1040', '#2a1850'],
    gradientCard:  ['#1e1440', '#160e30'],
    gradientAccent:['#a78bfa', '#f472b6', '#818cf8'],
    glowColor:     '#a78bfa',
    emojiHost:     '🔮',
  },
  questions,
  questionCount: 10,
  splashCards: [
    { name: "Aries",       img: "/zodiac/aries.jpg" },
    { name: "Taurus",      img: "/zodiac/taurus.jpg" },
    { name: "Gemini",      img: "/zodiac/gemini.jpg" },
    { name: "Cancer",      img: "/zodiac/cancer.jpg" },
    { name: "Leo",         img: "/zodiac/leo.jpg" },
    { name: "Virgo",       img: "/zodiac/virgo.jpg" },
    { name: "Libra",       img: "/zodiac/libra.jpg" },
    { name: "Scorpio",     img: "/zodiac/scorpio.jpg" },
    { name: "Sagittarius", img: "/zodiac/sagittarius.jpg" },
    { name: "Capricorn",   img: "/zodiac/capricorn.jpg" },
    { name: "Aquarius",    img: "/zodiac/aquarius.jpg" },
    { name: "Pisces",      img: "/zodiac/pisces.jpg" },
  ],
};

export default zodiacConfig;
