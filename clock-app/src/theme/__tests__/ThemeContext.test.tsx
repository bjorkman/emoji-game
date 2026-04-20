import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider, useTheme, defaultTheme } from '../ThemeContext';
import { type Theme } from '../../core/types';

function Probe({ next }: Readonly<{ next?: Theme }>) {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <Text testID="primary">{theme.primary}</Text>
      <Text testID="accent">{theme.accent}</Text>
      {next && (
        <TouchableOpacity testID="set" onPress={() => setTheme(next)}>
          <Text>set</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

describe('ThemeContext', () => {
  it('exposes the default theme', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
    expect(getByTestId('primary').props.children).toBe(defaultTheme.primary);
    expect(getByTestId('accent').props.children).toBe(defaultTheme.accent);
  });

  it('updates when setTheme is called', () => {
    const next: Theme = {
      ...defaultTheme,
      primary: '#ff0000',
      accent: '#00ff00',
    };
    const { getByTestId } = render(
      <ThemeProvider>
        <Probe next={next} />
      </ThemeProvider>,
    );

    fireEvent.press(getByTestId('set'));

    expect(getByTestId('primary').props.children).toBe('#ff0000');
    expect(getByTestId('accent').props.children).toBe('#00ff00');
  });

  it('useTheme outside provider falls back to default', () => {
    const { getByTestId } = render(<Probe />);
    expect(getByTestId('primary').props.children).toBe(defaultTheme.primary);
  });

  it('defaultTheme has all required fields', () => {
    expect(defaultTheme).toEqual(
      expect.objectContaining({
        primary: expect.any(String),
        secondary: expect.any(String),
        secondaryRgb: expect.any(String),
        accent: expect.any(String),
        splashBg: expect.any(String),
        gradientBg: expect.any(Array),
        gradientCard: expect.any(Array),
        gradientAccent: expect.any(Array),
        glowColor: expect.any(String),
      }),
    );
  });
});
