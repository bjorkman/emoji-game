import { type Continent, type Theme } from '../../core/types';
import { paths } from './paths';

export const analogLandTheme: Theme = {
  primary: '#fbbf24',
  secondary: '#60a5fa',
  secondaryRgb: '96, 165, 250',
  accent: '#34d399',
  splashBg: '#0a1628',
  gradientBg: ['#0a1628', '#1a2744', '#1e3a5f'],
  gradientCard: ['#1a2744', '#1e3a5f'],
  gradientAccent: ['#fbbf24', '#f59e0b', '#d97706'],
  glowColor: '#fbbf24',
};

export const analogLand: Continent = {
  id: 'analogLand',
  title: 'Analog Land',
  subtitle: 'Learn to read the clock hands',
  emoji: '\u{1F570}',
  theme: analogLandTheme,
  paths,
  bossEmoji: '\u{1F989}',
};
