import React from 'react';

export type Theme = 'light' | 'dark';
export interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  children?: React.ReactNode;
}
export const ThemeContext = React.createContext<ThemeContextProps>({
  theme: 'light',
  setTheme: () => {},
});
