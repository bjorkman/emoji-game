import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';
import { usePlayerStore } from '../../store/playerStore';
import { useAuthStore } from '../../store/authStore';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const mockChain = (): any => {
  const chain: any = {};
  const methods = ['select', 'eq', 'lte', 'gte', 'order', 'limit', 'single', 'in', 'not', 'or', 'upsert', 'insert', 'update'];
  for (const m of methods) chain[m] = jest.fn(() => chain);
  chain.single.mockResolvedValue({ data: null, error: { message: 'not found' } });
  chain.order.mockReturnValue(chain);
  chain.limit.mockResolvedValue({ data: [], error: null });
  return chain;
};

jest.mock('../../lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => mockChain()),
    auth: {
      getSession: jest.fn().mockResolvedValue({ data: { session: null } }),
      signInAnonymously: jest.fn().mockResolvedValue({ data: { user: { id: 'test' } }, error: null }),
    },
  },
}));

const createNavWrapper = () => {
  const navigation = {
    navigate: jest.fn(),
    replace: jest.fn(),
    goBack: jest.fn(),
    setOptions: jest.fn(),
    reset: jest.fn(),
    isFocused: jest.fn(() => true),
    canGoBack: jest.fn(() => false),
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
  const route = { key: 'home', name: 'Home' as const, params: undefined };
  return { navigation, route };
};

describe('HomeScreen', () => {
  beforeEach(() => {
    usePlayerStore.setState({ nickname: null, highScores: [] });
    useAuthStore.setState({ playerId: 'test-player', isReady: true });
  });

  it('shows nickname gate when no nickname set', () => {
    const { navigation, route } = createNavWrapper();
    const { getByText, getByPlaceholderText } = render(
      <HomeScreen navigation={navigation} route={route} />
    );

    expect(getByText("What's your name?")).toBeTruthy();
    expect(getByPlaceholderText('Enter a nickname...')).toBeTruthy();
  });

  it('shows game grid when nickname is set', () => {
    usePlayerStore.setState({ nickname: 'TestPlayer' });
    const { navigation, route } = createNavWrapper();
    const { getByText } = render(
      <HomeScreen navigation={navigation} route={route} />
    );

    expect(getByText('Emoji Games')).toBeTruthy();
    expect(getByText('Playing as TestPlayer')).toBeTruthy();
    // Check that all 5 games appear
    expect(getByText('KMOJI')).toBeTruthy();
    expect(getByText('ANIMOJI')).toBeTruthy();
  });

  it('sets nickname when submitted', () => {
    const { navigation, route } = createNavWrapper();
    const { getByPlaceholderText, getByText } = render(
      <HomeScreen navigation={navigation} route={route} />
    );

    fireEvent.changeText(getByPlaceholderText('Enter a nickname...'), 'Alice');
    fireEvent.press(getByText("Let's play"));

    expect(usePlayerStore.getState().nickname).toBe('Alice');
  });

  it('navigates to game when card pressed', () => {
    usePlayerStore.setState({ nickname: 'TestPlayer' });
    const { navigation, route } = createNavWrapper();
    const { getByText } = render(
      <HomeScreen navigation={navigation} route={route} />
    );

    fireEvent.press(getByText('KMOJI'));
    expect(navigation.navigate).toHaveBeenCalledWith('Game', { gameId: 'kpop' });
  });

  it('navigates to friends when Friends link pressed', () => {
    usePlayerStore.setState({ nickname: 'TestPlayer' });
    const { navigation, route } = createNavWrapper();
    const { getByText } = render(
      <HomeScreen navigation={navigation} route={route} />
    );

    fireEvent.press(getByText('Friends'));
    expect(navigation.navigate).toHaveBeenCalledWith('Friends');
  });

  it('shows recent scores when they exist', () => {
    usePlayerStore.setState({
      nickname: 'TestPlayer',
      highScores: [{
        id: 's1',
        gameId: 'kpop',
        gameTitle: 'KMOJI',
        nickname: 'TestPlayer',
        score: 20,
        total: 24,
        duration: 95,
        date: '2026-03-20T12:00:00Z',
      }],
    });
    const { navigation, route } = createNavWrapper();
    const { getByText } = render(
      <HomeScreen navigation={navigation} route={route} />
    );

    expect(getByText('Recent Scores')).toBeTruthy();
    expect(getByText('20/24')).toBeTruthy();
    expect(getByText('83%')).toBeTruthy();
  });

  it('shows challenge join section', () => {
    usePlayerStore.setState({ nickname: 'TestPlayer' });
    const { navigation, route } = createNavWrapper();
    const { getByText, getByPlaceholderText } = render(
      <HomeScreen navigation={navigation} route={route} />
    );

    expect(getByText('Join a Challenge')).toBeTruthy();
    expect(getByPlaceholderText('Enter code (e.g. KPOP-XK7P)')).toBeTruthy();
  });
});
