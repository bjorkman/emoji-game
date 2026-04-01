import { type Path } from '../../core/types';

export const paths: Path[] = [
  {
    id: 'amTimes',
    continentId: 'digital12',
    title: 'Morning (AM)',
    description: 'Read morning times with AM',
    emoji: '\u{1F305}',
    bossEmoji: '\u2615',
    levels: [
      {
        levelNumber: 1,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'wholeHours', displayMode: 'digital12', period: 'AM' },
      },
      {
        levelNumber: 2,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'halfHours', displayMode: 'digital12', period: 'AM' },
      },
      {
        levelNumber: 3,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'quarterHours', displayMode: 'digital12', period: 'AM' },
      },
    ],
  },
  {
    id: 'pmTimes',
    continentId: 'digital12',
    title: 'Afternoon (PM)',
    description: 'Read afternoon and evening times with PM',
    emoji: '\u{1F307}',
    bossEmoji: '\u{1F319}',
    levels: [
      {
        levelNumber: 1,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'wholeHours', displayMode: 'digital12', period: 'PM' },
      },
      {
        levelNumber: 2,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'halfHours', displayMode: 'digital12', period: 'PM' },
      },
      {
        levelNumber: 3,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'quarterHours', displayMode: 'digital12', period: 'PM' },
      },
    ],
  },
  {
    id: 'quarterHours12',
    continentId: 'digital12',
    title: 'Quarter Hours',
    description: 'Read quarter-hour times with AM and PM',
    emoji: '\u{1F554}',
    bossEmoji: '\u{1F308}',
    levels: [
      {
        levelNumber: 1,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'quarterHours', displayMode: 'digital12' },
      },
      {
        levelNumber: 2,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'quarterHours', displayMode: 'digital12' },
      },
      {
        levelNumber: 3,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'quarterHours', displayMode: 'digital12' },
      },
    ],
  },
  {
    id: 'anyMinute12',
    continentId: 'digital12',
    title: 'Any Minute',
    description: 'Read any time with AM and PM',
    emoji: '\u{1F558}',
    bossEmoji: '\u{1F4AB}',
    levels: [
      {
        levelNumber: 1,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'anyMinute', displayMode: 'digital12' },
      },
      {
        levelNumber: 2,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'anyMinute', displayMode: 'digital12' },
      },
      {
        levelNumber: 3,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'anyMinute', displayMode: 'digital12' },
      },
      {
        levelNumber: 4,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'anyMinute', displayMode: 'digital12' },
      },
    ],
  },
  {
    id: 'fiveMinutes12',
    continentId: 'digital12',
    title: 'Five-Minute Steps',
    description: 'Read five-minute intervals with AM and PM',
    emoji: '\u{1F556}',
    bossEmoji: '\u{1F3AF}',
    levels: [
      {
        levelNumber: 1,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'fiveMinutes', displayMode: 'digital12' },
      },
      {
        levelNumber: 2,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'fiveMinutes', displayMode: 'digital12' },
      },
      {
        levelNumber: 3,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'fiveMinutes', displayMode: 'digital12' },
      },
      {
        levelNumber: 4,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'fiveMinutes', displayMode: 'digital12' },
      },
    ],
  },
  {
    id: 'mixedReview12',
    continentId: 'digital12',
    title: 'Mixed Review',
    description: 'A mix of everything — prove your 12h mastery!',
    emoji: '\u{1F504}',
    bossEmoji: '\u{1F31F}',
    levels: [
      {
        levelNumber: 1,
        questionCount: 10,
        inputMode: 'multipleChoice',
        generator: { type: 'mixedReview', displayMode: 'digital12' },
      },
      {
        levelNumber: 2,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'mixedReview', displayMode: 'digital12' },
      },
      {
        levelNumber: 3,
        questionCount: 10,
        inputMode: 'freeText',
        generator: { type: 'mixedReview', displayMode: 'digital12' },
      },
    ],
  },
];
