import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { render, fireEvent, act } from '@testing-library/react-native';
import LevelEngine from '../LevelEngine';
import { type LevelDef, type ClockQuestion, type Feedback } from '../types';

jest.useFakeTimers();

jest.mock('../clockLogic', () => ({
  generateLevelQuestions: jest.fn(),
  isTimeCorrect: jest.fn((answer: string, q: { correctAnswer: string }) => answer === q.correctAnswer),
}));

jest.mock('../../lib/haptics', () => ({
  hapticCorrect: jest.fn(),
  hapticWrong: jest.fn(),
  hapticSuccess: jest.fn(),
}));

jest.mock('../../lib/sounds', () => ({
  playCorrect: jest.fn(),
  playWrong: jest.fn(),
}));

import { generateLevelQuestions } from '../clockLogic';

const mockedGenerate = generateLevelQuestions as jest.MockedFunction<typeof generateLevelQuestions>;

const makeQuestion = (id: string, correct: string): ClockQuestion => ({
  id,
  hour: 3,
  minute: 0,
  displayMode: 'analog',
  correctAnswer: correct,
  aliases: [],
});

const levelDef: LevelDef = {
  levelNumber: 1,
  questionCount: 3,
  inputMode: 'freeText',
  generator: { type: 'wholeHours', displayMode: 'analog' },
};

interface RenderedProps {
  question: ClockQuestion;
  onAnswer: (a: string) => void;
  onSkip: () => void;
  feedback: Feedback;
  current: number;
  total: number;
  score: number;
}

function renderEngine(onFinish: jest.Mock) {
  const lastProps: { current: RenderedProps | null } = { current: null };
  const utils = render(
    <LevelEngine
      levelDef={levelDef}
      onFinish={onFinish}
      renderPlaying={(props) => {
        lastProps.current = props;
        return (
          <>
            <Text testID="correct-answer">{props.question.correctAnswer}</Text>
            <Text testID="score">{props.score}</Text>
            <Text testID="current">{props.current}</Text>
            <Text testID="feedback">{props.feedback ?? 'none'}</Text>
            <TouchableOpacity testID="submit" onPress={() => props.onAnswer(props.question.correctAnswer)}>
              <Text>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity testID="submit-wrong" onPress={() => props.onAnswer('WRONG')}>
              <Text>Wrong</Text>
            </TouchableOpacity>
            <TouchableOpacity testID="skip" onPress={props.onSkip}>
              <Text>Skip</Text>
            </TouchableOpacity>
          </>
        );
      }}
    />
  );
  return { ...utils, lastProps };
}

describe('LevelEngine', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedGenerate.mockReturnValue([
      makeQuestion('q1', '3:00'),
      makeQuestion('q2', '4:00'),
      makeQuestion('q3', '5:00'),
    ]);
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
  });

  it('renders nothing until deck is generated', () => {
    mockedGenerate.mockReturnValue([]);
    const onFinish = jest.fn();
    const { queryByTestId } = renderEngine(onFinish);
    expect(queryByTestId('score')).toBeNull();
  });

  it('renders the first question on mount', () => {
    const onFinish = jest.fn();
    const { getByTestId } = renderEngine(onFinish);
    expect(getByTestId('correct-answer').props.children).toBe('3:00');
    expect(getByTestId('current').props.children).toBe(1);
    expect(getByTestId('score').props.children).toBe(0);
  });

  it('increments score on correct answer', () => {
    const onFinish = jest.fn();
    const { getByTestId } = renderEngine(onFinish);
    fireEvent.press(getByTestId('submit'));
    expect(getByTestId('score').props.children).toBe(1);
    expect(getByTestId('feedback').props.children).toBe('correct');
  });

  it('shows wrong feedback on incorrect answer and leaves score unchanged', () => {
    const onFinish = jest.fn();
    const { getByTestId } = renderEngine(onFinish);
    fireEvent.press(getByTestId('submit-wrong'));
    expect(getByTestId('feedback').props.children).toBe('wrong');
    expect(getByTestId('score').props.children).toBe(0);
  });

  it('advances to the next question after a correct answer', () => {
    const onFinish = jest.fn();
    const { getByTestId } = renderEngine(onFinish);
    fireEvent.press(getByTestId('submit'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(getByTestId('correct-answer').props.children).toBe('4:00');
    expect(getByTestId('current').props.children).toBe(2);
    expect(getByTestId('feedback').props.children).toBe('none');
  });

  it('uses a longer delay after a wrong answer (2s)', () => {
    const onFinish = jest.fn();
    const { getByTestId } = renderEngine(onFinish);
    fireEvent.press(getByTestId('submit-wrong'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(getByTestId('current').props.children).toBe(1);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(getByTestId('current').props.children).toBe(2);
  });

  it('treats skip as wrong and advances', () => {
    const onFinish = jest.fn();
    const { getByTestId } = renderEngine(onFinish);
    fireEvent.press(getByTestId('skip'));
    expect(getByTestId('feedback').props.children).toBe('wrong');
    expect(getByTestId('score').props.children).toBe(0);
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(getByTestId('current').props.children).toBe(2);
  });

  it('ignores presses while feedback is shown', () => {
    const onFinish = jest.fn();
    const { getByTestId } = renderEngine(onFinish);
    fireEvent.press(getByTestId('submit'));
    fireEvent.press(getByTestId('submit'));
    expect(getByTestId('score').props.children).toBe(1);
  });

  it('calls onFinish with final score and star rating after the last question', () => {
    const onFinish = jest.fn();
    const { getByTestId } = renderEngine(onFinish);
    // Answer all 3 correctly
    fireEvent.press(getByTestId('submit'));
    act(() => { jest.advanceTimersByTime(1000); });
    fireEvent.press(getByTestId('submit'));
    act(() => { jest.advanceTimersByTime(1000); });
    fireEvent.press(getByTestId('submit'));
    act(() => { jest.advanceTimersByTime(1000); });

    expect(onFinish).toHaveBeenCalledWith(3, 3, 3);
  });

  it('reports 0 stars when no questions answered correctly', () => {
    mockedGenerate.mockReturnValue([
      makeQuestion('q1', '3:00'),
      makeQuestion('q2', '4:00'),
      makeQuestion('q3', '5:00'),
      makeQuestion('q4', '6:00'),
      makeQuestion('q5', '7:00'),
    ]);
    const onFinish = jest.fn();
    const { getByTestId } = renderEngine(onFinish);
    for (let i = 0; i < 5; i++) {
      fireEvent.press(getByTestId('submit-wrong'));
      act(() => { jest.advanceTimersByTime(2000); });
    }
    expect(onFinish).toHaveBeenCalledWith(0, 5, 0);
  });
});
