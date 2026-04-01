import { type Path } from '../../core/types';

export const paths: Path[] = [
  {
    id: 'wholeHours24',
    continentId: 'digital24',
    title: 'Whole Hours',
    description: 'Read hours from 00:00 to 23:00 on a 24-hour clock',
    emoji: '\u{1F55B}',
    bossEmoji: '\u{1F680}',
    levels: [
      {
        levelNumber: 1,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'wholeHours', displayMode: 'digital24' },
      },
      {
        levelNumber: 2,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'wholeHours', displayMode: 'digital24' },
      },
      {
        levelNumber: 3,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'wholeHours', displayMode: 'digital24' },
      },
    ],
  },
  {
    id: 'halfHours24',
    continentId: 'digital24',
    title: 'Half Hours',
    description: 'Read times like 14:30 and 03:30',
    emoji: '\u{1F55E}',
    bossEmoji: '\u{1F30D}',
    levels: [
      {
        levelNumber: 1,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'halfHours', displayMode: 'digital24' },
      },
      {
        levelNumber: 2,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'halfHours', displayMode: 'digital24' },
      },
      {
        levelNumber: 3,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'halfHours', displayMode: 'digital24' },
      },
    ],
  },
  {
    id: 'quarterHours24',
    continentId: 'digital24',
    title: 'Quarter Hours',
    description: 'Read times like 14:15 and 20:45',
    emoji: '\u{1F55F}',
    bossEmoji: '\u{1F30A}',
    levels: [
      {
        levelNumber: 1,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'quarterHours', displayMode: 'digital24' },
      },
      {
        levelNumber: 2,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'quarterHours', displayMode: 'digital24' },
      },
      {
        levelNumber: 3,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'quarterHours', displayMode: 'digital24' },
      },
    ],
  },
  {
    id: 'fiveMinutes24',
    continentId: 'digital24',
    title: 'Five-Minute Steps',
    description: 'Read any time in 5-minute intervals',
    emoji: '\u{1F560}',
    bossEmoji: '\u{26A1}',
    levels: [
      {
        levelNumber: 1,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'fiveMinutes', displayMode: 'digital24' },
      },
      {
        levelNumber: 2,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'fiveMinutes', displayMode: 'digital24' },
      },
      {
        levelNumber: 3,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'fiveMinutes', displayMode: 'digital24' },
      },
      {
        levelNumber: 4,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'fiveMinutes', displayMode: 'digital24' },
      },
    ],
  },
  {
    id: 'anyMinute24',
    continentId: 'digital24',
    title: 'Any Minute',
    description: 'Read any time on the 24-hour clock',
    emoji: '\u{1F561}',
    bossEmoji: '\u{1F525}',
    levels: [
      {
        levelNumber: 1,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'anyMinute', displayMode: 'digital24' },
      },
      {
        levelNumber: 2,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'anyMinute', displayMode: 'digital24' },
      },
      {
        levelNumber: 3,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'anyMinute', displayMode: 'digital24' },
      },
      {
        levelNumber: 4,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'anyMinute', displayMode: 'digital24' },
      },
    ],
  },
  {
    id: 'mixedReview24',
    continentId: 'digital24',
    title: 'Mixed Review',
    description: 'A mix of everything — prove your 24h mastery!',
    emoji: '\u{1F504}',
    bossEmoji: '\u{1F916}',
    levels: [
      {
        levelNumber: 1,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'mixedReview', displayMode: 'digital24' },
      },
      {
        levelNumber: 2,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'mixedReview', displayMode: 'digital24' },
      },
      {
        levelNumber: 3,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'mixedReview', displayMode: 'digital24' },
      },
    ],
  },
];
