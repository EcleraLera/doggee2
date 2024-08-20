import React from 'react';

import { IntlContext } from '../context/IntlContext';

export interface TranslateMessage {
  path: string;
  children?: React.ReactNode;
  values?: Record<string, string | number | boolean>;
}
export const useIntl = () => {
  const intl = React.useContext(IntlContext);

  const translateMessage = (
    path: TranslateMessage['path'],
    values?: TranslateMessage['values']
    // path: string,
    // values: Record<string, string | number | boolean> = {}
  ) => {
    if (!intl.messages[path]) return path;
    if (!values) return intl.messages[path];

    let translate = intl.messages[path];
    Object.keys(values).forEach((key) => {
      translate = translate.replace(`{${key}}`, String(values[key]));
    });
    return translate;
  };

  return { ...intl, translateMessage };
};
