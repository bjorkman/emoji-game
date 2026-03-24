import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider, useTheme, defaultTheme } from '../ThemeContext';
import { type Theme } from '../../core/types';

function ThemeDisplay() {
  const { theme } = useTheme();
  return <Text testID="primary">{theme.primary}</Text>;
}

describe('ThemeContext', () => {
  it('provides default theme values', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>,
    );

    expect(getByTestId('primary').props.children).toBe(defaultTheme.primary);
  });

  it('updates theme when setTheme is called', () => {
    const greenTheme: Theme = {
      primary: '#86efac',
      secondary: '#fb923c',
      secondaryRgb: '251, 146, 60',
      accent: '#fde047',
      splashBg: '#060f04',
    };

    function TestComponent() {
      const { theme, setTheme } = useTheme();
      return (
        <>
          <Text testID="primary">{theme.primary}</Text>
          <Text testID="change" onPress={() => setTheme(greenTheme)}>
            Change
          </Text>
        </>
      );
    }

    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(getByTestId('primary').props.children).toBe(defaultTheme.primary);
    fireEvent.press(getByTestId('change'));
    expect(getByTestId('primary').props.children).toBe('#86efac');
  });

  it('returns default context when used outside provider', () => {
    // useTheme outside provider returns the default context value
    const { getByTestId } = render(<ThemeDisplay />);
    expect(getByTestId('primary').props.children).toBe(defaultTheme.primary);
  });
});
