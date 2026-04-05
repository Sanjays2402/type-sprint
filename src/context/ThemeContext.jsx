import { createContext, useContext, useState, useEffect } from 'react';
import { themes } from '../data/themes';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState(() => {
    return localStorage.getItem('ts-theme') || 'dark';
  });

  const theme = themes[themeName] || themes.dark;

  useEffect(() => {
    localStorage.setItem('ts-theme', themeName);
    document.body.style.backgroundColor = theme.bg;
    document.body.style.color = theme.textActive;
  }, [themeName, theme]);

  return (
    <ThemeContext.Provider value={{ theme, themeName, setThemeName, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
