import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import FriendsScreen from '../FriendsScreen';
import { useAuthStore } from '../../store/authStore';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const mockSearchPlayers = jest.fn().mockResolvedValue([]);
const mockSendRequest = jest.fn().mockResolvedValue(true);
const mockAcceptRequest = jest.fn().mockResolvedValue(true);
const mockFetchFriends = jest.fn().mockResolvedValue([]);
const mockFetchChallenges = jest.fn().mockResolvedValue([]);

jest.mock('../../lib/db', () => ({
  searchPlayersByNickname: (...args: any[]) => mockSearchPlayers(...args),
  sendFriendRequest: (...args: any[]) => mockSendRequest(...args),
  acceptFriendRequest: (...args: any[]) => mockAcceptRequest(...args),
  fetchFriends: (...args: any[]) => mockFetchFriends(...args),
  fetchMyChallenges: (...args: any[]) => mockFetchChallenges(...args),
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

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  replace: jest.fn(),
  setOptions: jest.fn(),
  reset: jest.fn(),
  isFocused: jest.fn(() => true),
  canGoBack: jest.fn(() => true),
  getParent: jest.fn(),
  getState: jest.fn(),
  dispatch: jest.fn(),
  addListener: jest.fn(() => jest.fn()),
  removeListener: jest.fn(),
  getId: jest.fn(),
  setParams: jest.fn(),
  pop: jest.fn(),
  popTo: jest.fn(),
  popToTop: jest.fn(),
  push: jest.fn(),
} as any;

const mockRoute = { key: 'friends', name: 'Friends' as const, params: undefined };

function renderScreen() {
  return render(<FriendsScreen navigation={mockNavigation} route={mockRoute} />);
}

describe('FriendsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.setState({ playerId: 'player-1', isReady: true });
  });

  it('renders title and sections', async () => {
    const { getByText } = renderScreen();
    expect(getByText('Friends')).toBeTruthy();
    expect(getByText('Add a Friend')).toBeTruthy();
    expect(getByText('Friends (0)')).toBeTruthy();
    expect(getByText('My Challenges')).toBeTruthy();
  });

  it('searches for players', async () => {
    mockSearchPlayers.mockResolvedValueOnce([
      { id: 'p2', nickname: 'Alice' },
    ]);

    const { getByTestId, getByText } = renderScreen();

    fireEvent.changeText(getByTestId('search-input'), 'Ali');
    fireEvent.press(getByTestId('search-btn'));

    await waitFor(() => {
      expect(mockSearchPlayers).toHaveBeenCalledWith('Ali');
      expect(getByText('Alice')).toBeTruthy();
    });
  });

  it('shows no players found error', async () => {
    mockSearchPlayers.mockResolvedValueOnce([]);

    const { getByTestId, getByText } = renderScreen();
    fireEvent.changeText(getByTestId('search-input'), 'zzz');
    fireEvent.press(getByTestId('search-btn'));

    await waitFor(() => {
      expect(getByText('No players found.')).toBeTruthy();
    });
  });

  it('sends friend request', async () => {
    mockSearchPlayers.mockResolvedValueOnce([{ id: 'p2', nickname: 'Bob' }]);

    const { getByTestId, getByText } = renderScreen();
    fireEvent.changeText(getByTestId('search-input'), 'Bob');
    fireEvent.press(getByTestId('search-btn'));

    await waitFor(() => expect(getByText('Bob')).toBeTruthy());
    fireEvent.press(getByTestId('add-p2'));

    await waitFor(() => {
      expect(mockSendRequest).toHaveBeenCalledWith('player-1', 'p2');
      expect(getByText('Sent')).toBeTruthy();
    });
  });

  it('shows pending requests with accept button', async () => {
    mockFetchFriends.mockResolvedValue([
      { id: 'f1', friend_id: 'p3', nickname: 'Carol', status: 'pending', direction: 'incoming' },
    ]);

    const { getByText, getByTestId } = renderScreen();

    await waitFor(() => {
      expect(getByText('Pending Requests')).toBeTruthy();
      expect(getByText('Carol')).toBeTruthy();
    });

    fireEvent.press(getByTestId('accept-f1'));
    await waitFor(() => {
      expect(mockAcceptRequest).toHaveBeenCalledWith('f1');
    });
  });

  it('shows accepted friends', async () => {
    mockFetchFriends.mockResolvedValue([
      { id: 'f2', friend_id: 'p4', nickname: 'Dave', status: 'accepted', direction: 'outgoing' },
    ]);

    const { getByText } = renderScreen();
    await waitFor(() => {
      expect(getByText('Friends (1)')).toBeTruthy();
      expect(getByText('Dave')).toBeTruthy();
    });
  });

  it('shows challenges with participants', async () => {
    mockFetchChallenges.mockResolvedValue([{
      id: 'ch-1',
      code: 'KPOP-AB12',
      game_id: 'kpop',
      created_at: '2026-03-20T12:00:00Z',
      participants: [
        { nickname: 'Tester', score: 20, total: 24, duration: 60 },
      ],
    }]);

    const { getByText } = renderScreen();
    await waitFor(() => {
      expect(getByText('KPOP-AB12')).toBeTruthy();
      expect(getByText('KPOP')).toBeTruthy();
      expect(getByText('Tester')).toBeTruthy();
    });
  });

  it('navigates back when Home pressed', () => {
    const { getByText } = renderScreen();
    fireEvent.press(getByText('← Home'));
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });
});
