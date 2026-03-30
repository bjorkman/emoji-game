import { type GameConfig } from '../../core/types';
import questions from './data';

const soccerConfig: GameConfig = {
  id: 'soccer',
  title: 'GOLMOJI',
  eyebrow: '⚽ Soccer Emoji Challenge',
  tagline: 'Name That Club!',
  inputPlaceholder: 'Guess the club\u2026',
  instructions: [
    ['🃏', '25 clubs, emoji clues only'],
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
    primary:       '#10b981',
    secondary:     '#84cc16',
    secondaryRgb:  '132, 204, 22',
    accent:        '#14b8a6',
    splashBg:      '#040e08',
    gradientBg:    ['#0a1a10', '#0a2a18', '#103a20'],
    gradientCard:  ['#0e2a18', '#1a3a22'],
    gradientAccent:['#10b981', '#84cc16', '#14b8a6'],
    glowColor:     '#10b981',
    emojiHost:     '😬',
  },
  questions,
  questionCount: 10,
  splashCards: [
    { name: "Real Madrid",       img: "/soccer/realmadrid.jpg" },
    { name: "Barcelona",         img: "/soccer/barcelona.jpg" },
    { name: "Manchester United",  img: "/soccer/manutd.jpg" },
    { name: "Liverpool",         img: "/soccer/liverpool.jpg" },
    { name: "Bayern Munich",     img: "/soccer/bayernmunich.jpg" },
    { name: "PSG",               img: "/soccer/psg.jpg" },
    { name: "Juventus",          img: "/soccer/juventus.jpg" },
    { name: "Chelsea",           img: "/soccer/chelsea.jpg" },
    { name: "AC Milan",          img: "/soccer/acmilan.jpg" },
    { name: "Arsenal",           img: "/soccer/arsenal.jpg" },
    { name: "Borussia Dortmund", img: "/soccer/dortmund.jpg" },
    { name: "Inter Milan",       img: "/soccer/intermilan.jpg" },
  ],
};

export default soccerConfig;
