import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GameCard from '../GameCard';
import { ThemeProvider } from '../../theme/ThemeContext';
import { type Question } from '../../core/types';

const testQuestion: Question = {
  id: 1,
  answer: 'CAT',
  clues: ['🐱', '😺'],
  difficulty: 'easy',
  aliases: [],
  hint: 'Has 9 lives',
};

function renderWithTheme(overrides = {}) {
  const defaultProps = {
    question: testQuestion,
    inputValue: '',
    onInputChange: jest.fn(),
    onSubmit: jest.fn(),
    onSkip: jest.fn(),
    feedback: null as any,
    placeholder: 'Your guess...',
  };

  return render(
    <ThemeProvider>
      <GameCard {...defaultProps} {...overrides} />
    </ThemeProvider>
  );
}

describe('GameCard', () => {
  it('displays emoji clues', () => {
    const { getByText } = renderWithTheme();
    expect(getByText('🐱')).toBeTruthy();
    expect(getByText('😺')).toBeTruthy();
  });

  it('displays difficulty badge', () => {
    const { getByText } = renderWithTheme();
    expect(getByText('Easy')).toBeTruthy();
  });

  it('calls onInputChange when text entered', () => {
    const onInputChange = jest.fn();
    const { getByTestId } = renderWithTheme({ onInputChange });
    fireEvent.changeText(getByTestId('game-input'), 'cat');
    expect(onInputChange).toHaveBeenCalledWith('cat');
  });

  it('calls onSubmit when submit pressed', () => {
    const onSubmit = jest.fn();
    const { getByTestId } = renderWithTheme({ onSubmit, inputValue: 'cat' });
    fireEvent.press(getByTestId('submit-btn'));
    expect(onSubmit).toHaveBeenCalled();
  });

  it('calls onSkip when skip pressed', () => {
    const onSkip = jest.fn();
    const { getByTestId } = renderWithTheme({ onSkip });
    fireEvent.press(getByTestId('skip-btn'));
    expect(onSkip).toHaveBeenCalled();
  });

  it('disables input when feedback is set', () => {
    const { getByTestId } = renderWithTheme({ feedback: 'correct' });
    const input = getByTestId('game-input');
    expect(input.props.editable).toBe(false);
  });

  it('shows hint text (hidden by default via opacity)', () => {
    const { getByText } = renderWithTheme();
    expect(getByText('💡 Has 9 lives')).toBeTruthy();
  });
});
