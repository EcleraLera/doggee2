import React from 'react';

export interface IntlContextProps {
  locale: string;
  messages: Record<string, string>;
  children?: React.ReactNode;
}
export const IntlContext = React.createContext<IntlContextProps>({
  locale: 'ru',
  messages: {},
});
