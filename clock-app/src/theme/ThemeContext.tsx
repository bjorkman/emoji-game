import React, { createContext, useContext, useState, useMemo } from 'react';
import { type Theme } from '../core/types';

const defaultTheme: Theme = {
  primary: '#fbbf24',
  secondary: '#60a5fa',
  secondaryRgb: '96, 165, 250',
  accent: '#34d399',
  splashBg: '#0a1628',
  gradientBg: ['#0a1628', '#1a2744', '#1e3a5f'],
  gradientCard: ['#1a2744', '#1e3a5f'],
  gradientAccent: ['#fbbf24', '#f59e0b', '#d97706'],
  glowColor: '#fbbf24',
};

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: defaultTheme,
  setTheme: () => {},
});

export function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

export { defaultTheme };
