import {
  LocalizationConfig,
  SupportedLocale,
} from 'models/LocalizationConfig.interface';
import { loadLocaleFromLS } from 'utils/localStorage';

// eslint-disable-next-line import/prefer-default-export
export const localizationConfig: LocalizationConfig = {
  defaultLocale: (loadLocaleFromLS() as SupportedLocale) || 'en_US',
  fallbackLocale: 'en_US',
};
