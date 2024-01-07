import { SupportedLocale } from 'models/LocalizationConfig.interface';

const localStoragePrefix = 'graphiql-amogus-';

export const saveLocaleToLS = (locale: SupportedLocale) => {
  localStorage.setItem(`${localStoragePrefix}lang`, locale);
};

export const loadLocaleFromLS = () => {
  return localStorage.getItem(`${localStoragePrefix}lang`);
};
