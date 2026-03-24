import { type Question } from './types';

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replaceAll(/[\u0300-\u036f]/g, '');
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function isCorrect(input: string, question: Question): boolean {
  const n = normalize(input);
  if (!n) return false;
  return [question.answer, ...question.aliases].map(normalize).includes(n);
}
