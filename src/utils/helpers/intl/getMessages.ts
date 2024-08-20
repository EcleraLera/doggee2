// // import { DEFAULT_LOCALE } from './getLocale';
// import type { AcceptLocale } from './getLocale';

// export const getMessages = async (locale: AcceptLocale) => {
// try {
// const messages = await import(`../../../static/locales/${locale + 1}.json`);
// return messages;
// // } catch {
// const messages = await import(`../../../static/locales/${DEFAULT_LOCALE}.json`);
// return messages;
//
//
// };
import enUS from '../../../static/locales/en-US.json';
import ruRU from '../../../static/locales/ru.json';

const locales: Record<string, Record<string, string>> = {
  'en-US': enUS,
  'ru-RU': ruRU,
};

export const getMessages = async (locale: string) => {
  try {
    const messages = locales[locale];
    if (!messages) throw new Error(`Locale ${locale} not found`);
    // console.log('Loaded messages:', messages);
    return messages;
  } catch (error) {
    // console.error('Error loading messages:', error);
    return {};
  }
};
