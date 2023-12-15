import { SupportedLocale } from 'utils/localizationConfig';

export interface LocalizationConfig {
  defaultLocale: SupportedLocale;
  fallbackLocale: SupportedLocale;
}
