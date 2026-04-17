import { type GameConfig } from '../../core/types';
import questions from './data';

const kpopConfig: GameConfig = {
  id: 'kpop',
  title: 'KMOJI',
  eyebrow: '🎵 K-pop Emoji Challenge',
  tagline: 'Crack the Idol Code',
  inputPlaceholder: 'Guess the K-pop group…',
  instructions: [
    ['🃏', '40 groups & soloists, emoji clues only'],
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
    primary:       '#ff6ec7',
    secondary:     '#a78bfa',
    secondaryRgb:  '167, 139, 250',
    accent:        '#38bdf8',
    splashBg:      '#07071a',
    gradientBg:    ['#0a0a2e', '#2a0a3e', '#3a0a4e'],
    gradientCard:  ['#2a1040', '#1e0a38'],
    gradientAccent:['#ff6ec7', '#a78bfa', '#6366f1'],
    glowColor:     '#ff6ec7',
    emojiHost:     '🤔',
  },
  questions,
  questionCount: 10,
  splashCards: [
    { name: "BLACKPINK",  img: "/groups/blackpink.jpg" },
    { name: "BTS",        img: "/groups/bts.jpg" },
    { name: "TWICE",      img: "/groups/twice.jpg" },
    { name: "EXO",        img: "/groups/exo.jpg" },
    { name: "SEVENTEEN",  img: "/groups/seventeen.jpg" },
    { name: "STRAY KIDS", img: "/groups/straykids.jpg" },
    { name: "ATEEZ",      img: "/groups/ateez.jpg" },
    { name: "BIGBANG",    img: "/groups/bigbang.jpg" },
    { name: "AESPA",      img: "/groups/aespa.jpg" },
    { name: "TXT",        img: "/groups/txt.jpg" },
    { name: "MAMAMOO",    img: "/groups/mamamoo.jpg" },
    { name: "SHINEE",     img: "/groups/shinee.jpg" },
  ],
};

export default kpopConfig;
