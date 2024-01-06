export interface LocalizationConfig {
  defaultLocale: SupportedLocale;
  fallbackLocale: SupportedLocale;
}

export type Translation = {
  [key: string]: string;
};

export type SupportedLocale = 'en_US' | 'ru_RU';
