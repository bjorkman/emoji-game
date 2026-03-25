import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Leaderboard from '../Leaderboard';
import { ThemeProvider } from '../../theme/ThemeContext';
import { usePlayerStore } from '../../store/playerStore';
import { useAuthStore } from '../../store/authStore';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const mockFetchGlobal = jest.fn().mockResolvedValue([]);
const mockFetchFriends = jest.fn().mockResolvedValue([]);
const mockFetchChallenge = jest.fn().mockResolvedValue([]);

jest.mock('../../services/scoreService', () => ({
  fetchGlobalLeaderboard: (...args: any[]) => mockFetchGlobal(...args),
  fetchFriendsLeaderboard: (...args: any[]) => mockFetchFriends(...args),
}));

jest.mock('../../services/challengeService', () => ({
  fetchChallengeLeaderboard: (...args: any[]) => mockFetchChallenge(...args),
}));

jest.mock('../../lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({ upsert: jest.fn().mockResolvedValue({ error: null }) })),
    auth: {
      getSession: jest.fn().mockResolvedValue({ data: { session: null } }),
      signInAnonymously: jest.fn().mockResolvedValue({ data: { user: { id: 'test' } }, error: null }),
    },
  },
}));

function renderWithTheme(overrides = {}) {
  const defaults = {
    gameId: 'kpop',
    gameTitle: 'KMOJI',
    latestId: 'score-1',
    onReplay: jest.fn(),
  };
  return render(
    <ThemeProvider>
      <Leaderboard {...defaults} {...overrides} />
    </ThemeProvider>
  );
}

describe('Leaderboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.setState({ playerId: 'player-1', isReady: true });
    usePlayerStore.setState({
      nickname: 'Tester',
      highScores: [
        { id: 'score-1', gameId: 'kpop', gameTitle: 'KMOJI', nickname: 'Tester', score: 20, total: 24, duration: 60, date: '2026-03-20T12:00:00Z' },
        { id: 'score-2', gameId: 'kpop', gameTitle: 'KMOJI', nickname: 'Tester', score: 15, total: 24, duration: 80, date: '2026-03-19T12:00:00Z' },
      ],
    });
  });

  it('renders title', () => {
    const { getByText } = renderWithTheme();
    expect(getByText('KMOJI')).toBeTruthy();
    expect(getByText('Leaderboard')).toBeTruthy();
  });

  it('shows local tab with scores by default', () => {
    const { getByText } = renderWithTheme();
    expect(getByText('20/24')).toBeTruthy();
    expect(getByText('15/24')).toBeTruthy();
  });

  it('highlights current score', () => {
    const { getByTestId } = renderWithTheme();
    expect(getByTestId('highlight-row')).toBeTruthy();
  });

  it('shows tab buttons', () => {
    const { getByTestId } = renderWithTheme();
    expect(getByTestId('tab-local')).toBeTruthy();
    expect(getByTestId('tab-global')).toBeTruthy();
    expect(getByTestId('tab-friends')).toBeTruthy();
  });

  it('fetches global scores on tab switch', async () => {
    mockFetchGlobal.mockResolvedValue([
      { id: 'g1', player_id: 'p1', nickname: 'GlobalPlayer', score: 24, total: 24, duration: 30 },
    ]);

    const { getByTestId, getByText } = renderWithTheme();
    fireEvent.press(getByTestId('tab-global'));

    await waitFor(() => {
      expect(mockFetchGlobal).toHaveBeenCalledWith('kpop');
      expect(getByText('GlobalPlayer')).toBeTruthy();
    });
  });

  it('shows challenge tab when challengeId provided', () => {
    const { getByTestId } = renderWithTheme({ challengeId: 'ch-1' });
    expect(getByTestId('tab-challenge')).toBeTruthy();
  });

  it('calls onReplay when Play Again pressed', () => {
    const onReplay = jest.fn();
    const { getByTestId } = renderWithTheme({ onReplay });
    fireEvent.press(getByTestId('replay-btn'));
    expect(onReplay).toHaveBeenCalled();
  });

  it('shows empty message when no scores', () => {
    usePlayerStore.setState({ highScores: [] });
    const { getByText } = renderWithTheme();
    expect(getByText('No scores yet.')).toBeTruthy();
  });
});
