import { SupportedLocale } from 'shared/context/LocalizationContext';

export interface LocalizationConfig {
  defaultLocale: SupportedLocale;
  fallbackLocale: SupportedLocale;
}
