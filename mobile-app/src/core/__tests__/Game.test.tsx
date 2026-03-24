import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { render, fireEvent, act } from '@testing-library/react-native';
import Game from '../Game';
import { type GameConfig, type Question } from '../types';
import { usePlayerStore } from '../../store/playerStore';
import { useAuthStore } from '../../store/authStore';
import { ThemeProvider } from '../../theme/ThemeContext';

// ─── Mocks ──────────────────────────────────────────────────────────────────

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('../../lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      upsert: jest.fn().mockResolvedValue({ error: null }),
      insert: jest.fn(() => ({ select: jest.fn(() => ({ single: jest.fn().mockResolvedValue({ data: { id: 'remote-1' }, error: null }) })) })),
    })),
    auth: {
      getSession: jest.fn().mockResolvedValue({ data: { session: null } }),
      signInAnonymously: jest.fn().mockResolvedValue({ data: { user: { id: 'test' } }, error: null }),
    },
  },
}));

jest.mock('expo-crypto', () => ({
  randomUUID: jest.fn(() => 'test-uuid-123'),
}));

// ─── Test Config ────────────────────────────────────────────────────────────

const testQuestions: Question[] = [
  { id: 1, answer: 'CAT', clues: ['🐱'], difficulty: 'easy', aliases: ['kitty'] },
  { id: 2, answer: 'DOG', clues: ['🐶'], difficulty: 'easy', aliases: [] },
];

const testConfig: GameConfig = {
  id: 'test',
  title: 'Test Game',
  eyebrow: 'Test',
  tagline: 'A test game',
  inputPlaceholder: 'Type answer...',
  instructions: ['Guess the animal'],
  splashCards: [],
  grades: [
    { min: 80, label: 'A', emoji: '🌟' },
    { min: 50, label: 'B', emoji: '👍' },
    { min: 0, label: 'F', emoji: '😢' },
  ],
  theme: {
    primary: '#ff0000',
    secondary: '#00ff00',
    secondaryRgb: '0, 255, 0',
    accent: '#0000ff',
    splashBg: '#000000',
  },
  questions: testQuestions,
};

// ─── Render helpers ─────────────────────────────────────────────────────────

const renderSplash = ({ config, onPlay, onChooseGame }: any) => (
  <View>
    <Text testID="splash-title">{config.title}</Text>
    <TouchableOpacity testID="play-btn" onPress={onPlay}><Text>Play</Text></TouchableOpacity>
    <TouchableOpacity testID="home-btn" onPress={onChooseGame}><Text>Home</Text></TouchableOpacity>
  </View>
);

const renderPlaying = ({ question, score, current, total, feedback, onSubmit, onSkip, onCancel }: any) => (
  <View>
    <Text testID="clues">{question.clues.join(' ')}</Text>
    <Text testID="progress">Q{current}/{total}</Text>
    <Text testID="score">Score: {score}</Text>
    {feedback && <Text testID="feedback">{feedback}</Text>}
    <TouchableOpacity testID="submit-btn" onPress={onSubmit}><Text>Submit</Text></TouchableOpacity>
    <TouchableOpacity testID="skip-btn" onPress={onSkip}><Text>Skip</Text></TouchableOpacity>
    <TouchableOpacity testID="cancel-btn" onPress={onCancel}><Text>Cancel</Text></TouchableOpacity>
  </View>
);

const renderResult = ({ score, total, missed, onNext }: any) => (
  <View>
    <Text testID="result-score">{score}/{total}</Text>
    <Text testID="missed-count">Missed: {missed.length}</Text>
    <TouchableOpacity testID="next-btn" onPress={onNext}><Text>Next</Text></TouchableOpacity>
  </View>
);

const renderLeaderboard = ({ gameTitle, onReplay }: any) => (
  <View>
    <Text testID="lb-title">{gameTitle} Leaderboard</Text>
    <TouchableOpacity testID="replay-btn" onPress={onReplay}><Text>Replay</Text></TouchableOpacity>
  </View>
);

function renderGame(overrides = {}) {
  return render(
    <ThemeProvider>
      <Game
        config={testConfig}
        onGoHome={jest.fn()}
        renderSplash={renderSplash}
        renderPlaying={renderPlaying}
        renderResult={renderResult}
        renderLeaderboard={renderLeaderboard}
        {...overrides}
      />
    </ThemeProvider>
  );
}

// Helper: advance timers and flush microtasks
async function advanceAndFlush(ms: number) {
  jest.advanceTimersByTime(ms);
  // Flush microtask queue (for async callbacks inside setTimeout)
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
}

// ─── Tests ──────────────────────────────────────────────────────────────────

describe('Game state machine', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    usePlayerStore.setState({ nickname: 'Tester', highScores: [] });
    useAuthStore.setState({ playerId: 'player-1', isReady: true });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('starts in splash phase', () => {
    const { getByTestId } = renderGame();
    expect(getByTestId('splash-title').props.children).toBe('Test Game');
  });

  it('transitions to playing when Play pressed', () => {
    const { getByTestId } = renderGame();
    fireEvent.press(getByTestId('play-btn'));
    expect(getByTestId('progress')).toBeTruthy();
    expect(getByTestId('score').props.children).toEqual(['Score: ', 0]);
  });

  it('shows question clues after starting', () => {
    const { getByTestId } = renderGame();
    fireEvent.press(getByTestId('play-btn'));
    const clues = getByTestId('clues').props.children;
    expect(['🐱', '🐶']).toContain(clues);
  });

  it('can cancel game and return to splash', () => {
    const { getByTestId } = renderGame();
    fireEvent.press(getByTestId('play-btn'));
    expect(getByTestId('progress')).toBeTruthy();
    fireEvent.press(getByTestId('cancel-btn'));
    expect(getByTestId('splash-title')).toBeTruthy();
  });

  it('advances to next question after skip + delay', () => {
    const { getByTestId } = renderGame();
    fireEvent.press(getByTestId('play-btn'));

    const firstClues = getByTestId('clues').props.children;
    fireEvent.press(getByTestId('skip-btn'));

    // Feedback shown
    expect(getByTestId('feedback').props.children).toBe('wrong');

    // After delay, next question
    act(() => { jest.advanceTimersByTime(2000); });
    const nextClues = getByTestId('clues').props.children;
    expect(nextClues).not.toBe(firstClues);
  });

  it('transitions to result after all questions skipped', async () => {
    const { getByTestId } = renderGame();
    fireEvent.press(getByTestId('play-btn'));

    // Skip question 1
    fireEvent.press(getByTestId('skip-btn'));
    act(() => { jest.advanceTimersByTime(2000); });

    // Skip question 2
    fireEvent.press(getByTestId('skip-btn'));

    // Advance timer for the delay, then flush async submitScore
    await act(async () => {
      await advanceAndFlush(2000);
    });

    expect(getByTestId('result-score')).toBeTruthy();
    expect(getByTestId('missed-count').props.children).toEqual(['Missed: ', 2]);
  });

  it('transitions through all phases: splash → playing → result → leaderboard → replay', async () => {
    const { getByTestId } = renderGame();

    // Splash
    expect(getByTestId('splash-title')).toBeTruthy();

    // → Playing
    fireEvent.press(getByTestId('play-btn'));
    expect(getByTestId('progress')).toBeTruthy();

    // Skip both
    fireEvent.press(getByTestId('skip-btn'));
    act(() => { jest.advanceTimersByTime(2000); });
    fireEvent.press(getByTestId('skip-btn'));
    await act(async () => {
      await advanceAndFlush(2000);
    });

    // → Result
    expect(getByTestId('result-score')).toBeTruthy();

    // → Leaderboard
    fireEvent.press(getByTestId('next-btn'));
    expect(getByTestId('lb-title')).toBeTruthy();

    // → Replay (back to playing)
    fireEvent.press(getByTestId('replay-btn'));
    expect(getByTestId('progress')).toBeTruthy();
  });
});
