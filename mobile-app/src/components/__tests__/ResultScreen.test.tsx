import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ResultScreen from '../ResultScreen';
import { ThemeProvider } from '../../theme/ThemeContext';
import { useAuthStore } from '../../store/authStore';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('../../lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      upsert: jest.fn().mockResolvedValue({ error: null }),
      insert: jest.fn(() => ({ select: jest.fn(() => ({ single: jest.fn().mockResolvedValue({ data: { code: 'TEST-1234' }, error: null }) })) })),
      select: jest.fn(() => ({ eq: jest.fn(() => ({ single: jest.fn().mockResolvedValue({ data: { id: 'ch-1', game_id: 'kpop' }, error: null }) })) })),
      update: jest.fn(() => ({ eq: jest.fn().mockResolvedValue({ error: null }) })),
    })),
    auth: {
      getSession: jest.fn().mockResolvedValue({ data: { session: null } }),
      signInAnonymously: jest.fn().mockResolvedValue({ data: { user: { id: 'test' } }, error: null }),
    },
  },
}));

const grades = [
  { min: 80, label: 'Amazing!', emoji: '🌟' },
  { min: 50, label: 'Good job', emoji: '👍' },
  { min: 0, label: 'Try again', emoji: '😢' },
];

const missedQuestions = [
  { id: 1, answer: 'CAT', clues: ['🐱'], difficulty: 'easy' as const, aliases: [] },
  { id: 2, answer: 'DOG', clues: ['🐶'], difficulty: 'hard' as const, aliases: [] },
];

function renderWithTheme(overrides = {}) {
  const defaults = {
    score: 18,
    total: 25,
    missed: missedQuestions,
    grades,
    gameId: 'animals',
    onNext: jest.fn(),
  };
  return render(
    <ThemeProvider>
      <ResultScreen {...defaults} {...overrides} />
    </ThemeProvider>
  );
}

describe('ResultScreen', () => {
  beforeEach(() => {
    useAuthStore.setState({ playerId: 'player-1', isReady: true });
  });

  it('displays score', () => {
    const { getByText } = renderWithTheme();
    expect(getByText('18')).toBeTruthy();
    expect(getByText('/ 25')).toBeTruthy();
  });

  it('displays correct grade for 72%', () => {
    const { getByText } = renderWithTheme({ score: 18, total: 25 });
    // 72% → Good job
    expect(getByText(/Good job/)).toBeTruthy();
  });

  it('displays Amazing grade for 100%', () => {
    const { getByText } = renderWithTheme({ score: 25, total: 25, missed: [] });
    expect(getByText(/Amazing/)).toBeTruthy();
  });

  it('displays missed questions', () => {
    const { getByText } = renderWithTheme();
    expect(getByText('Missed (2)')).toBeTruthy();
    expect(getByText('CAT')).toBeTruthy();
    expect(getByText('DOG')).toBeTruthy();
  });

  it('hides missed section when no misses', () => {
    const { queryByText } = renderWithTheme({ missed: [] });
    expect(queryByText(/Missed/)).toBeNull();
  });

  it('calls onNext when View Leaderboard pressed', () => {
    const onNext = jest.fn();
    const { getByTestId } = renderWithTheme({ onNext });
    fireEvent.press(getByTestId('leaderboard-btn'));
    expect(onNext).toHaveBeenCalled();
  });

  it('shows Challenge Friends button when playerId exists', () => {
    const { getByTestId } = renderWithTheme();
    expect(getByTestId('challenge-btn')).toBeTruthy();
  });

  it('hides Challenge Friends when no playerId', () => {
    useAuthStore.setState({ playerId: null });
    const { queryByTestId } = renderWithTheme();
    expect(queryByTestId('challenge-btn')).toBeNull();
  });
});
