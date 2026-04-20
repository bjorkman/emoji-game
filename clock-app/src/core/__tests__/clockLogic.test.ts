import {
  toHour12,
  formatTimeAnswer,
  normalizeTimeInput,
  isTimeCorrect,
  generateLevelQuestions,
} from '../clockLogic';
import { type ClockQuestion, type QuestionGeneratorConfig } from '../types';

const makeQuestion = (
  correctAnswer: string,
  aliases: string[] = [],
  displayMode: ClockQuestion['displayMode'] = 'analog',
): ClockQuestion => ({
  id: 'q-1',
  hour: 3,
  minute: 0,
  displayMode,
  correctAnswer,
  aliases,
});

describe('toHour12', () => {
  it('returns 12 AM for hour 0', () => {
    expect(toHour12(0)).toEqual({ h12: 12, period: 'AM' });
  });

  it('returns 1-11 AM for morning hours', () => {
    expect(toHour12(1)).toEqual({ h12: 1, period: 'AM' });
    expect(toHour12(11)).toEqual({ h12: 11, period: 'AM' });
  });

  it('returns 12 PM for hour 12', () => {
    expect(toHour12(12)).toEqual({ h12: 12, period: 'PM' });
  });

  it('returns 1-11 PM for afternoon hours', () => {
    expect(toHour12(13)).toEqual({ h12: 1, period: 'PM' });
    expect(toHour12(23)).toEqual({ h12: 11, period: 'PM' });
  });

  it('handles every hour in 0-23', () => {
    for (let h = 0; h < 24; h++) {
      const { h12, period } = toHour12(h);
      expect(h12).toBeGreaterThanOrEqual(1);
      expect(h12).toBeLessThanOrEqual(12);
      expect(['AM', 'PM']).toContain(period);
    }
  });
});

describe('formatTimeAnswer', () => {
  it('formats analog display without leading zero on hour', () => {
    expect(formatTimeAnswer(3, 0, 'analog')).toBe('3:00');
    expect(formatTimeAnswer(10, 45, 'analog')).toBe('10:45');
  });

  it('pads minutes with leading zero', () => {
    expect(formatTimeAnswer(3, 5, 'analog')).toBe('3:05');
  });

  it('formats digital24 with zero-padded hour', () => {
    expect(formatTimeAnswer(3, 0, 'digital24')).toBe('03:00');
    expect(formatTimeAnswer(0, 0, 'digital24')).toBe('00:00');
    expect(formatTimeAnswer(23, 59, 'digital24')).toBe('23:59');
  });

  it('formats digital12 with AM/PM suffix', () => {
    expect(formatTimeAnswer(0, 30, 'digital12')).toBe('12:30 AM');
    expect(formatTimeAnswer(12, 0, 'digital12')).toBe('12:00 PM');
    expect(formatTimeAnswer(15, 45, 'digital12')).toBe('3:45 PM');
  });
});

describe('normalizeTimeInput', () => {
  it('trims whitespace', () => {
    expect(normalizeTimeInput('  3:00  ')).toBe('3:00');
  });

  it('converts dots to colons', () => {
    expect(normalizeTimeInput('3.00')).toBe('3:00');
    expect(normalizeTimeInput('12.45')).toBe('12:45');
  });

  it('inserts colon into 3-digit input', () => {
    expect(normalizeTimeInput('300')).toBe('3:00');
    expect(normalizeTimeInput('945')).toBe('9:45');
  });

  it('inserts colon into 4-digit input', () => {
    expect(normalizeTimeInput('1200')).toBe('12:00');
    expect(normalizeTimeInput('0315')).toBe('03:15');
  });

  it('leaves colon-separated input alone', () => {
    expect(normalizeTimeInput('3:00')).toBe('3:00');
  });

  it('leaves non-numeric-only input alone', () => {
    expect(normalizeTimeInput('3:00 PM')).toBe('3:00 PM');
  });
});

describe('isTimeCorrect', () => {
  it('matches the correctAnswer exactly', () => {
    const q = makeQuestion('3:00', ['03:00', '3.00']);
    expect(isTimeCorrect('3:00', q)).toBe(true);
  });

  it('matches aliases', () => {
    const q = makeQuestion('3:00', ['03:00', '3.00']);
    expect(isTimeCorrect('03:00', q)).toBe(true);
    expect(isTimeCorrect('3.00', q)).toBe(true);
  });

  it('is case-insensitive for AM/PM', () => {
    const q = makeQuestion('3:00 PM', ['3:00 pm', '3:00pm'], 'digital12');
    expect(isTimeCorrect('3:00 PM', q)).toBe(true);
    expect(isTimeCorrect('3:00 pm', q)).toBe(true);
  });

  it('trims whitespace before matching', () => {
    const q = makeQuestion('3:00');
    expect(isTimeCorrect('  3:00  ', q)).toBe(true);
  });

  it('normalises dot to colon before matching', () => {
    const q = makeQuestion('3:00');
    expect(isTimeCorrect('3.00', q)).toBe(true);
  });

  it('normalises missing colon before matching', () => {
    const q = makeQuestion('3:00');
    expect(isTimeCorrect('300', q)).toBe(true);
  });

  it('rejects empty input', () => {
    const q = makeQuestion('3:00');
    expect(isTimeCorrect('', q)).toBe(false);
    expect(isTimeCorrect('   ', q)).toBe(false);
  });

  it('rejects wrong answer', () => {
    const q = makeQuestion('3:00');
    expect(isTimeCorrect('4:00', q)).toBe(false);
  });
});

describe('generateLevelQuestions', () => {
  const wholeHourAnalog: QuestionGeneratorConfig = { type: 'wholeHours', displayMode: 'analog' };
  const fiveMinDigital24: QuestionGeneratorConfig = { type: 'fiveMinutes', displayMode: 'digital24' };

  it('returns the requested question count', () => {
    const qs = generateLevelQuestions(wholeHourAnalog, 'freeText', 5);
    expect(qs).toHaveLength(5);
  });

  it('generates wholeHours with minute=0', () => {
    const qs = generateLevelQuestions(wholeHourAnalog, 'freeText', 5);
    for (const q of qs) {
      expect(q.minute).toBe(0);
    }
  });

  it('generates fiveMinutes with minute divisible by 5', () => {
    const qs = generateLevelQuestions(fiveMinDigital24, 'freeText', 10);
    for (const q of qs) {
      expect(q.minute % 5).toBe(0);
    }
  });

  it('generates quarterHours with minute in [0, 15, 30, 45]', () => {
    const qs = generateLevelQuestions({ type: 'quarterHours', displayMode: 'analog' }, 'freeText', 8);
    for (const q of qs) {
      expect([0, 15, 30, 45]).toContain(q.minute);
    }
  });

  it('generates halfHours with minute in [0, 30]', () => {
    const qs = generateLevelQuestions({ type: 'halfHours', displayMode: 'analog' }, 'freeText', 6);
    for (const q of qs) {
      expect([0, 30]).toContain(q.minute);
    }
  });

  it('sets displayMode on each question', () => {
    const qs = generateLevelQuestions(fiveMinDigital24, 'freeText', 3);
    for (const q of qs) {
      expect(q.displayMode).toBe('digital24');
    }
  });

  it('defaults to analog display when none specified', () => {
    const qs = generateLevelQuestions({ type: 'wholeHours' }, 'freeText', 3);
    for (const q of qs) {
      expect(q.displayMode).toBe('analog');
    }
  });

  it('populates correctAnswer matching the display format', () => {
    const qs = generateLevelQuestions(fiveMinDigital24, 'freeText', 3);
    for (const q of qs) {
      expect(q.correctAnswer).toMatch(/^\d{2}:\d{2}$/);
    }
  });

  it('includes choices for multipleChoice mode', () => {
    const qs = generateLevelQuestions(wholeHourAnalog, 'multipleChoice', 3);
    for (const q of qs) {
      expect(q.choices).toBeDefined();
      expect(q.choices!.length).toBeGreaterThan(1);
      expect(q.choices!.length).toBeLessThanOrEqual(4);
      expect(q.choices).toContain(q.correctAnswer);
    }
  });

  it('omits choices for freeText mode', () => {
    const qs = generateLevelQuestions(wholeHourAnalog, 'freeText', 3);
    for (const q of qs) {
      expect(q.choices).toBeUndefined();
    }
  });

  it('restricts hour range by period=AM', () => {
    const qs = generateLevelQuestions(
      { type: 'wholeHours', displayMode: 'digital24', period: 'AM' },
      'freeText',
      5,
    );
    for (const q of qs) {
      expect(q.hour).toBeGreaterThanOrEqual(0);
      expect(q.hour).toBeLessThanOrEqual(11);
    }
  });

  it('restricts hour range by period=PM', () => {
    const qs = generateLevelQuestions(
      { type: 'wholeHours', displayMode: 'digital24', period: 'PM' },
      'freeText',
      5,
    );
    for (const q of qs) {
      expect(q.hour).toBeGreaterThanOrEqual(12);
      expect(q.hour).toBeLessThanOrEqual(23);
    }
  });
});
