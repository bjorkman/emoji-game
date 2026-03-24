import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SplashScreen from '../SplashScreen';
import { ThemeProvider } from '../../theme/ThemeContext';
import { type GameConfig } from '../../core/types';

jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return {
    LinearGradient: ({ children, ...props }: any) => <View {...props}>{children}</View>,
  };
});

const testConfig: GameConfig = {
  id: 'test',
  title: 'Test Game',
  eyebrow: 'TEST',
  tagline: 'A fun test',
  inputPlaceholder: 'Guess...',
  instructions: [['🎯', 'Guess the answer'], ['⏱', 'Beat the clock']],
  splashCards: [],
  grades: [{ min: 0, label: 'F', emoji: '😢' }],
  theme: { primary: '#ff0000', secondary: '#00ff00', secondaryRgb: '0,255,0', accent: '#0000ff', splashBg: '#000' },
  questions: [],
};

function renderWithTheme(overrides = {}) {
  return render(
    <ThemeProvider>
      <SplashScreen config={testConfig} onPlay={jest.fn()} onChooseGame={jest.fn()} {...overrides} />
    </ThemeProvider>
  );
}

describe('SplashScreen', () => {
  it('displays title and tagline', () => {
    const { getByText } = renderWithTheme();
    expect(getByText('Test Game')).toBeTruthy();
    expect(getByText('A fun test')).toBeTruthy();
  });

  it('displays eyebrow', () => {
    const { getByText } = renderWithTheme();
    expect(getByText('TEST')).toBeTruthy();
  });

  it('displays instructions', () => {
    const { getByText } = renderWithTheme();
    expect(getByText('Guess the answer')).toBeTruthy();
    expect(getByText('Beat the clock')).toBeTruthy();
  });

  it('calls onPlay when Play button pressed', () => {
    const onPlay = jest.fn();
    const { getByTestId } = renderWithTheme({ onPlay });
    fireEvent.press(getByTestId('play-btn'));
    expect(onPlay).toHaveBeenCalled();
  });

  it('calls onChooseGame when Choose Game pressed', () => {
    const onChooseGame = jest.fn();
    const { getByText } = renderWithTheme({ onChooseGame });
    fireEvent.press(getByText('Choose Game'));
    expect(onChooseGame).toHaveBeenCalled();
  });
});
