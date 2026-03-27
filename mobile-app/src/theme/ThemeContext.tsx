import React, { createContext, useContext, useState, useMemo } from 'react';
import { type Theme } from '../core/types';

const defaultTheme: Theme = {
  primary: '#ff6ec7',
  secondary: '#a78bfa',
  secondaryRgb: '167, 139, 250',
  accent: '#38bdf8',
  splashBg: '#07071a',
  gradientBg: ['#0a0a2e', '#1a0a3e', '#2a1050'],
  gradientCard: ['#1e1e5a', '#2a1a5e'],
  gradientAccent: ['#ff6eb4', '#a855f7', '#6366f1'],
  glowColor: '#ff6ec7',
  emojiHost: '🤔',
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
