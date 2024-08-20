import React from 'react';
import type { ThemeContextProps, Theme } from './ThemeContext';
import { ThemeContext } from './ThemeContext';

import darkTheme from '../../../static/css/themes/dark.module.css';
import lightTheme from '../../../static/css/themes/light.module.css';
import { setCookie } from '@/utils';

interface IntlProviderProps extends Omit<ThemeContextProps, 'setTheme'> {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<IntlProviderProps> = ({
  theme,
  children,
}) => {
  const [currentTheme, setCurrentTheme] = React.useState(theme);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    setCookie('doggee-theme', theme);
  };
  // const value = React.useMemo(() => ({ theme: currentTheme, setTheme }), []);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ThemeContext.Provider value={{ theme: currentTheme, setTheme }}>
      <div
        className={
          currentTheme === 'dark' ? darkTheme.darkTheme : lightTheme.lightTheme
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
