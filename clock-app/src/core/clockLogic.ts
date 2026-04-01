import { type ClockQuestion, type QuestionGeneratorConfig, type GeneratorType, type InputMode } from './types';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Shared helpers ──────────────────────────────────────────────────────────

export function toHour12(hour: number): { h12: number; period: 'AM' | 'PM' } {
  const period = hour >= 12 ? 'PM' as const : 'AM' as const;
  const h12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return { h12, period };
}

function getHourRange(config: QuestionGeneratorConfig): { minHour: number; maxHour: number } {
  if (config.period === 'AM') return { minHour: 0, maxHour: 11 };
  if (config.period === 'PM') return { minHour: 12, maxHour: 23 };
  const displayMode = config.displayMode ?? 'analog';
  if (displayMode === 'digital24' || displayMode === 'digital12') return { minHour: 0, maxHour: 23 };
  return { minHour: 1, maxHour: 12 };
}

function getPossibleMinutes(type: GeneratorType): number[] {
  switch (type) {
    case 'wholeHours':
      return [0];
    case 'halfHours':
      return [0, 30];
    case 'quarterHours':
      return [0, 15, 30, 45];
    case 'fiveMinutes':
      return Array.from({ length: 12 }, (_, i) => i * 5);
    case 'anyMinute':
    case 'mixedReview':
      return Array.from({ length: 60 }, (_, i) => i);
  }
}

export function formatTimeAnswer(hour: number, minute: number, displayMode: 'analog' | 'digital24' | 'digital12'): string {
  const mm = minute.toString().padStart(2, '0');
  if (displayMode === 'digital24') {
    return `${hour.toString().padStart(2, '0')}:${mm}`;
  }
  if (displayMode === 'digital12') {
    const { h12, period } = toHour12(hour);
    return `${h12}:${mm} ${period}`;
  }
  return `${hour}:${mm}`;
}

// ─── Internal generators ─────────────────────────────────────────────────────

function generateAliases(hour: number, minute: number, displayMode: 'analog' | 'digital24' | 'digital12'): string[] {
  const mm = minute.toString().padStart(2, '0');
  const aliases: string[] = [];

  if (displayMode === 'digital24') {
    aliases.push(`${hour}:${mm}`);
    aliases.push(`${hour.toString().padStart(2, '0')}.${mm}`);
    aliases.push(`${hour}.${mm}`);
    return aliases;
  }

  if (displayMode === 'digital12') {
    const { h12, period } = toHour12(hour);
    const periodLower = period.toLowerCase();
    aliases.push(`${h12}:${mm}${period}`);
    aliases.push(`${h12}:${mm} ${periodLower}`);
    aliases.push(`${h12}:${mm}${periodLower}`);
    aliases.push(`${h12}.${mm} ${period}`);
    aliases.push(`${h12}.${mm} ${periodLower}`);
    return aliases;
  }

  // Analog aliases
  if (hour < 10) {
    aliases.push(`0${hour}:${mm}`);
  }
  aliases.push(`${hour}.${mm}`);
  if (hour < 10) {
    aliases.push(`0${hour}.${mm}`);
  }
  return aliases;
}

function generateDistractors(
  correctHour: number,
  correctMinute: number,
  config: QuestionGeneratorConfig,
): string[] {
  const displayMode = config.displayMode ?? 'analog';
  const correct = formatTimeAnswer(correctHour, correctMinute, displayMode);
  const options = new Set<string>([correct]);

  const possibleMinutes = getPossibleMinutes(config.type);
  const { minHour, maxHour } = getHourRange(config);

  let attempts = 0;
  while (options.size < 4 && attempts < 50) {
    attempts++;
    const wrongHour = minHour + Math.floor(Math.random() * (maxHour - minHour + 1));
    const wrongMinute = possibleMinutes[Math.floor(Math.random() * possibleMinutes.length)];
    const wrong = formatTimeAnswer(wrongHour, wrongMinute, displayMode);
    if (wrong !== correct) {
      options.add(wrong);
    }
  }

  return shuffle([...options]);
}

function generateRawQuestions(config: QuestionGeneratorConfig, count: number): { hour: number; minute: number }[] {
  const possibleMinutes = getPossibleMinutes(config.type);
  const { minHour, maxHour } = getHourRange(config);
  const combinations: { hour: number; minute: number }[] = [];

  for (let h = minHour; h <= maxHour; h++) {
    for (const m of possibleMinutes) {
      combinations.push({ hour: h, minute: m });
    }
  }

  // Partial shuffle: only randomize first `count` elements instead of the full array
  for (let i = 0; i < Math.min(count, combinations.length); i++) {
    const j = i + Math.floor(Math.random() * (combinations.length - i));
    [combinations[i], combinations[j]] = [combinations[j], combinations[i]];
  }

  return combinations.slice(0, count);
}

// ─── Public API ──────────────────────────────────────────────────────────────

export function generateLevelQuestions(
  config: QuestionGeneratorConfig,
  inputMode: InputMode,
  count: number,
): ClockQuestion[] {
  const displayMode = config.displayMode ?? 'analog';
  const raw = generateRawQuestions(config, count);

  return raw.map((q, i) => {
    const correctAnswer = formatTimeAnswer(q.hour, q.minute, displayMode);
    const aliases = generateAliases(q.hour, q.minute, displayMode);
    const choices = inputMode === 'multipleChoice'
      ? generateDistractors(q.hour, q.minute, config)
      : undefined;

    return {
      id: `q-${Date.now()}-${i}`,
      hour: q.hour,
      minute: q.minute,
      displayMode,
      correctAnswer,
      aliases,
      choices,
    };
  });
}

export function normalizeTimeInput(input: string): string {
  let normalized = input.trim();
  // Replace all dot separators with colon
  normalized = normalized.replaceAll('.', ':');
  // Handle missing colon: "300" -> "3:00", "1200" -> "12:00"
  if (!normalized.includes(':') && /^\d{3,4}$/.test(normalized)) {
    const minutePart = normalized.slice(-2);
    const hourPart = normalized.slice(0, -2);
    normalized = `${hourPart}:${minutePart}`;
  }
  return normalized;
}

export function isTimeCorrect(input: string, question: ClockQuestion): boolean {
  const normalized = normalizeTimeInput(input);
  if (!normalized) return false;

  const validAnswers = [question.correctAnswer, ...question.aliases].map((a) =>
    a.trim().toLowerCase()
  );
  return validAnswers.includes(normalized.toLowerCase());
}
