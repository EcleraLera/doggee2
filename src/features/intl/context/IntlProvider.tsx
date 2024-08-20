/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import type { IntlContextProps } from './IntlContext';
import { IntlContext } from './IntlContext';

type IntlProviderProps = IntlContextProps;

export const IntlProvider: React.FC<IntlProviderProps> = ({
  locale,
  messages,
  children,
}) => {
  const value = React.useMemo(() => ({ locale, messages }), [locale, messages]);
  return <IntlContext.Provider value={value}>{children}</IntlContext.Provider>;
};
// return (
//   <IntlContext.Provider value={{ locale: 'ru', messages }}>
//     {children}
//   </IntlContext.Provider>
// );
// };
