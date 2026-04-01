export type ContinentId = 'analogLand' | 'digital24' | 'digital12';

export type StarRating = 0 | 1 | 2 | 3;

export type Feedback = 'correct' | 'wrong' | null;

export type InputMode = 'multipleChoice' | 'freeText';

export type GeneratorType =
  | 'wholeHours'
  | 'halfHours'
  | 'quarterHours'
  | 'fiveMinutes'
  | 'anyMinute'
  | 'mixedReview';

export interface QuestionGeneratorConfig {
  type: GeneratorType;
  displayMode?: 'analog' | 'digital24' | 'digital12';
  period?: 'AM' | 'PM';
}

export interface ClockQuestion {
  id: string;
  hour: number;
  minute: number;
  displayMode: 'analog' | 'digital24' | 'digital12';
  correctAnswer: string;
  aliases: string[];
  choices?: string[];
}

export interface LevelDef {
  levelNumber: number;
  questionCount: number;
  inputMode: InputMode;
  generator: QuestionGeneratorConfig;
}

export interface Path {
  id: string;
  continentId: ContinentId;
  title: string;
  description: string;
  emoji: string;
  levels: LevelDef[];
  bossEmoji: string;
}

export interface Continent {
  id: ContinentId;
  title: string;
  subtitle: string;
  emoji: string;
  theme: Theme;
  paths: Path[];
  bossEmoji: string;
}

export interface Theme {
  primary: string;
  secondary: string;
  secondaryRgb: string;
  accent: string;
  splashBg: string;
  gradientBg: [string, string, string];
  gradientCard: [string, string];
  gradientAccent: [string, string, string];
  glowColor: string;
}

export function calculateStars(score: number, total: number): StarRating {
  if (score >= total) return 3;
  if (score >= total - 1) return 2;
  if (score >= total - 3) return 1;
  return 0;
}
