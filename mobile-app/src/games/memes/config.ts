import { type GameConfig } from '../../core/types';
import questions from './data';

const memesConfig: GameConfig = {
  id: 'memes',
  title: 'MEMOJI',
  eyebrow: '🌐 Meme Emoji Challenge',
  tagline: 'Name That Meme!',
  inputPlaceholder: 'Guess the meme…',
  instructions: [
    ['🃏', '25 memes, emoji clues only'],
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
    primary:        '#ef4444',
    secondary:      '#f97316',
    secondaryRgb:   '249, 115, 22',
    accent:         '#fbbf24',
    splashBg:       '#140a04',
    gradientBg:     ['#1a0a0a', '#2a1008', '#3a1810'],
    gradientCard:   ['#2a1410', '#1e0c08'],
    gradientAccent: ['#ef4444', '#f97316', '#fbbf24'],
    glowColor:      '#ef4444',
    emojiHost:      '😏',
  },
  questions,
  questionCount: 10,
  splashCards: [
    { name: "Distracted Boyfriend", img: "/memes/distractedboyfriend.jpg" },
    { name: "This Is Fine",         img: "/memes/thisisfine.jpg" },
    { name: "Doge",                 img: "/memes/doge.jpg" },
    { name: "Nyan Cat",             img: "/memes/nyancat.jpg" },
    { name: "Drake Hotline Bling",  img: "/memes/drakehotlinebling.jpg" },
    { name: "Stonks",               img: "/memes/stonks.jpg" },
    { name: "Woman Yelling at Cat", img: "/memes/womanyellingatcat.jpg" },
    { name: "Surprised Pikachu",    img: "/memes/surprisedpikachu.jpg" },
    { name: "Expanding Brain",      img: "/memes/expandingbrain.jpg" },
    { name: "Rickroll",             img: "/memes/rickroll.jpg" },
    { name: "Grumpy Cat",           img: "/memes/grumpycat.jpg" },
    { name: "Trollface",            img: "/memes/trollface.jpg" },
  ],
};

export default memesConfig;
