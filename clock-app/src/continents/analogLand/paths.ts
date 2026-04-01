import { type Path } from '../../core/types';

export const paths: Path[] = [
  {
    id: 'wholeHours',
    continentId: 'analogLand',
    title: 'Whole Hours',
    description: 'Read the hour hand when the minute hand points to 12',
    emoji: '\u{1F551}',
    bossEmoji: '\u{1F981}',
    levels: [
      {
        levelNumber: 1,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'wholeHours' },
      },
      {
        levelNumber: 2,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'wholeHours' },
      },
      {
        levelNumber: 3,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'wholeHours' },
      },
    ],
  },
  {
    id: 'halfHours',
    continentId: 'analogLand',
    title: 'Half Hours',
    description: 'The minute hand points to 6 — it\'s half past!',
    emoji: '\u{1F553}',
    bossEmoji: '\u{1F43B}',
    levels: [
      {
        levelNumber: 1,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'halfHours' },
      },
      {
        levelNumber: 2,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'halfHours' },
      },
      {
        levelNumber: 3,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'halfHours' },
      },
    ],
  },
  {
    id: 'quarterHours',
    continentId: 'analogLand',
    title: 'Quarter Hours',
    description: 'Quarter past and quarter to — the clock in four pieces',
    emoji: '\u{1F554}',
    bossEmoji: '\u{1F985}',
    levels: [
      {
        levelNumber: 1,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'quarterHours' },
      },
      {
        levelNumber: 2,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'quarterHours' },
      },
      {
        levelNumber: 3,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'quarterHours' },
      },
    ],
  },
  {
    id: 'fiveMinutes',
    continentId: 'analogLand',
    title: 'Five-Minute Steps',
    description: 'Count by fives around the clock',
    emoji: '\u{1F556}',
    bossEmoji: '\u{1F40C}',
    levels: [
      {
        levelNumber: 1,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'fiveMinutes' },
      },
      {
        levelNumber: 2,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'fiveMinutes' },
      },
      {
        levelNumber: 3,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'fiveMinutes' },
      },
      {
        levelNumber: 4,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'fiveMinutes' },
      },
    ],
  },
  {
    id: 'anyMinute',
    continentId: 'analogLand',
    title: 'Any Minute',
    description: 'Master every minute on the clock',
    emoji: '\u{1F558}',
    bossEmoji: '\u{1F432}',
    levels: [
      {
        levelNumber: 1,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'anyMinute' },
      },
      {
        levelNumber: 2,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'anyMinute' },
      },
      {
        levelNumber: 3,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'anyMinute' },
      },
      {
        levelNumber: 4,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'anyMinute' },
      },
    ],
  },
  {
    id: 'mixedReview',
    continentId: 'analogLand',
    title: 'Mixed Review',
    description: 'A mix of everything — prove your mastery!',
    emoji: '\u{1F504}',
    bossEmoji: '\u{1F989}',
    levels: [
      {
        levelNumber: 1,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'mixedReview' },
      },
      {
        levelNumber: 2,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'mixedReview' },
      },
      {
        levelNumber: 3,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'mixedReview' },
      },
    ],
  },
];
