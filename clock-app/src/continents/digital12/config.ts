import { type Continent, type Theme } from '../../core/types';
import { paths } from './paths';

export const digital12Theme: Theme = {
  primary: '#f472b6',
  secondary: '#fb923c',
  secondaryRgb: '251, 146, 60',
  accent: '#e879f9',
  splashBg: '#0a1628',
  gradientBg: ['#0a1628', '#2a1744', '#3a1e5f'],
  gradientCard: ['#2a1744', '#3a1e5f'],
  gradientAccent: ['#f472b6', '#ec4899', '#db2777'],
  glowColor: '#f472b6',
};

export const digital12: Continent = {
  id: 'digital12',
  title: '12h Digital District',
  subtitle: 'Learn AM and PM',
  emoji: '\u23F0',
  theme: digital12Theme,
  paths,
  bossEmoji: '\u{1F31F}',
};
