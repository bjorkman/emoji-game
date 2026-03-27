import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../AppNavigator';
import { usePlayerStore } from '../../store/playerStore';
import { useAuthStore } from '../../store/authStore';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('../../lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      upsert: jest.fn().mockResolvedValue({ error: null }),
    })),
    auth: {
      getSession: jest.fn().mockResolvedValue({ data: { session: null } }),
      signInAnonymously: jest.fn().mockResolvedValue({ data: { user: { id: 'test' } }, error: null }),
    },
  },
}));

jest.mock('../../services/playerService', () => ({
  upsertPlayer: jest.fn().mockResolvedValue(undefined),
  searchPlayersByNickname: jest.fn().mockResolvedValue([]),
}));

jest.mock('../../services/scoreService', () => ({
  submitScore: jest.fn().mockResolvedValue(null),
  fetchGlobalLeaderboard: jest.fn().mockResolvedValue([]),
  fetchFriendsLeaderboard: jest.fn().mockResolvedValue([]),
}));

jest.mock('../../services/challengeService', () => ({
  fetchChallenge: jest.fn().mockResolvedValue(null),
  createChallenge: jest.fn().mockResolvedValue(null),
  linkScoreToChallenge: jest.fn().mockResolvedValue(undefined),
  fetchMyChallenges: jest.fn().mockResolvedValue([]),
  fetchChallengeLeaderboard: jest.fn().mockResolvedValue([]),
}));

jest.mock('../../services/friendService', () => ({
  fetchFriends: jest.fn().mockResolvedValue([]),
  sendFriendRequest: jest.fn().mockResolvedValue(true),
  acceptFriendRequest: jest.fn().mockResolvedValue(true),
}));

describe('AppNavigator', () => {
  beforeEach(() => {
    useAuthStore.setState({ playerId: 'test-player', isReady: true });
  });

  it('renders Home screen with nickname gate by default', () => {
    usePlayerStore.setState({ nickname: null });
    const { getByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    expect(getByText("What's your name?")).toBeTruthy();
  });

  it('renders Home screen game grid when nickname set', () => {
    usePlayerStore.setState({ nickname: 'Tester', highScores: [] });
    const { getByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    expect(getByText('Emoji')).toBeTruthy(); // Logo component renders "Emoji" + "Games" as separate Text nodes
    expect(getByText('Playing as Tester')).toBeTruthy();
  });

  it('can navigate to Game screen', () => {
    usePlayerStore.setState({ nickname: 'Tester', highScores: [] });
    const { getByText } = render(
      <NavigationContainer
        initialState={{
          routes: [{ name: 'Game', params: { gameId: 'kpop' } }],
        }}
      >
        <AppNavigator />
      </NavigationContainer>
    );

    expect(getByText('KMOJI')).toBeTruthy();
  });

  it('can navigate to Friends screen', () => {
    const { getByText } = render(
      <NavigationContainer
        initialState={{
          routes: [{ name: 'Friends' }],
        }}
      >
        <AppNavigator />
      </NavigationContainer>
    );

    expect(getByText('Friends')).toBeTruthy();
  });
});
