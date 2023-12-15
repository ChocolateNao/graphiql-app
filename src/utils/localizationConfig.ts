import { LocalizationConfig } from 'models/LocalizationConfig.interface';

export type Translation = {
  [key: string]: string;
};

export type SupportedLocale = 'en_US' | 'ru_RU';

export const localizationConfig: LocalizationConfig = {
  defaultLocale: 'en_US',
  fallbackLocale: 'en_US',
};
