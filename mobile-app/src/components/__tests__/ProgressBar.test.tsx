import React from 'react';
import { render } from '@testing-library/react-native';
import ProgressBar from '../ProgressBar';
import { ThemeProvider } from '../../theme/ThemeContext';

function renderWithTheme(props: any) {
  return render(
    <ThemeProvider>
      <ProgressBar {...props} />
    </ThemeProvider>
  );
}

describe('ProgressBar', () => {
  it('displays current question and total', () => {
    const { getByText } = renderWithTheme({ current: 3, total: 25, score: 2, elapsed: 45 });
    expect(getByText('Q 3/25')).toBeTruthy();
  });

  it('displays score', () => {
    const { getByText } = renderWithTheme({ current: 5, total: 25, score: 4, elapsed: 30 });
    expect(getByText('Score: 4')).toBeTruthy();
  });

  it('displays formatted time', () => {
    const { getByText } = renderWithTheme({ current: 1, total: 25, score: 0, elapsed: 125 });
    expect(getByText('2:05')).toBeTruthy();
  });
});
