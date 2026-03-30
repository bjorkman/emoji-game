import { type GameConfig } from '../../core/types';
import questions from './data';

const fastfoodConfig: GameConfig = {
  id: 'fastfood',
  title: 'NOMOJI',
  eyebrow: '🍟 Fast Food Emoji Challenge',
  tagline: 'Supersize Your Score!',
  inputPlaceholder: 'Guess the food…',
  instructions: [
    ['🃏', '25 foods, emoji clues only'],
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
    primary:       '#facc15',
    secondary:     '#ef4444',
    secondaryRgb:  '239, 68, 68',
    accent:        '#fb923c',
    splashBg:      '#140e02',
    gradientBg:    ['#1a1408', '#2a1a08', '#3a2010'],
    gradientCard:  ['#2a1e10', '#1e1608'],
    gradientAccent:['#facc15', '#fb923c', '#ef4444'],
    glowColor:     '#facc15',
    emojiHost:     '🤤',
  },
  questions,
  questionCount: 10,
  splashCards: [
    { name: "McDonald's",  img: "/fastfood/mcdonalds.jpg" },
    { name: "KFC",         img: "/fastfood/kfc.jpg" },
    { name: "Pizza Hut",   img: "/fastfood/pizzahut.jpg" },
    { name: "Starbucks",   img: "/fastfood/starbucks.jpg" },
    { name: "Burger King", img: "/fastfood/burgerking.jpg" },
    { name: "Taco Bell",   img: "/fastfood/tacobell.jpg" },
    { name: "Subway",      img: "/fastfood/subway.jpg" },
    { name: "Domino's",    img: "/fastfood/dominos.jpg" },
    { name: "Wendy's",     img: "/fastfood/wendys.jpg" },
    { name: "Chick-fil-A", img: "/fastfood/chickfila.jpg" },
    { name: "Chipotle",    img: "/fastfood/chipotle.jpg" },
    { name: "Krispy Kreme",img: "/fastfood/krispykreme.jpg" },
  ],
};

export default fastfoodConfig;
