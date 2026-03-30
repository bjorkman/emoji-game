import { type GameConfig } from '../../core/types';
import questions from './data';

const animeConfig: GameConfig = {
  id: 'anime',
  title: 'WEEBOJI',
  eyebrow: '⛩️ Anime Emoji Challenge',
  tagline: 'Guess the Character!',
  inputPlaceholder: 'Guess the character…',
  instructions: [
    ['🃏', '25 characters, emoji clues only'],
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
    primary:        '#e879f9',
    secondary:      '#818cf8',
    secondaryRgb:   '129, 140, 248',
    accent:         '#f472b6',
    splashBg:       '#0c0414',
    gradientBg:     ['#1a0a2a', '#2a0a3a', '#3a1048'],
    gradientCard:   ['#2a1040', '#1e0830'],
    gradientAccent: ['#e879f9', '#818cf8', '#c084fc'],
    glowColor:      '#e879f9',
    emojiHost:      '😤',
  },
  questions,
  questionCount: 10,
  splashCards: [
    { name: 'Naruto',        img: '/anime/naruto.jpg' },
    { name: 'Goku',          img: '/anime/goku.jpg' },
    { name: 'Luffy',         img: '/anime/luffy.jpg' },
    { name: 'Sailor Moon',   img: '/anime/sailormoon.jpg' },
    { name: 'Pikachu',       img: '/anime/pikachu.jpg' },
    { name: 'Eren Yeager',   img: '/anime/erenyeager.jpg' },
    { name: 'Light Yagami',  img: '/anime/lightyagami.jpg' },
    { name: 'Spike Spiegel', img: '/anime/spikespiegel.jpg' },
    { name: 'Lelouch',       img: '/anime/lelouch.jpg' },
    { name: 'Edward Elric',  img: '/anime/edwardelric.jpg' },
    { name: 'Levi Ackerman', img: '/anime/leviackerman.jpg' },
    { name: 'Tanjiro Kamado', img: '/anime/tanjirokamado.jpg' },
  ],
};

export default animeConfig;
