import React, { createContext, useContext, useState, useMemo } from 'react';
import { type Theme } from '../core/types';

const defaultTheme: Theme = {
  primary: '#ff6ec7',
  secondary: '#a78bfa',
  secondaryRgb: '167, 139, 250',
  accent: '#38bdf8',
  splashBg: '#07071a',
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
