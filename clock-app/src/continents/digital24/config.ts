import { type Continent, type Theme } from '../../core/types';
import { paths } from './paths';

export const digital24Theme: Theme = {
  primary: '#22d3ee',
  secondary: '#38bdf8',
  secondaryRgb: '56, 189, 248',
  accent: '#2dd4bf',
  splashBg: '#0a1628',
  gradientBg: ['#0a1628', '#0c2744', '#0e3a5a'],
  gradientCard: ['#0c2744', '#0e3a5a'],
  gradientAccent: ['#22d3ee', '#06b6d4', '#0891b2'],
  glowColor: '#22d3ee',
};

export const digital24: Continent = {
  id: 'digital24',
  title: '24h Digital Zone',
  subtitle: 'Master the 24-hour clock',
  emoji: '\u{1F5A5}',
  theme: digital24Theme,
  paths,
  bossEmoji: '\u{1F916}',
};
