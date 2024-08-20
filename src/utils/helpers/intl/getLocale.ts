const ACCEPT_LOCALES = ['en-US'] as const;
export const DEFAULT_LOCALE = ACCEPT_LOCALES[0];
export type AcceptLocale = typeof ACCEPT_LOCALES[number];

export const getLocale = (): AcceptLocale => {
  if (ACCEPT_LOCALES.find((locale) => locale === navigator.language)) {
    return navigator.language as typeof ACCEPT_LOCALES[number];
  }

  return DEFAULT_LOCALE;
};
