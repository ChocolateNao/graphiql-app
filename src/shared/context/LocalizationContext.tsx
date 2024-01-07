import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  SupportedLocale,
  Translation,
} from 'models/LocalizationConfig.interface';
import processVariables from 'utils/localizationVariables';

import { localizationConfig } from '../../config/localizationConfig';

type TLocalizationContext = {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  translate: (
    key: string | undefined,
    variables?: Record<string, string | null>
  ) => string | undefined;
  t: (
    key: string | undefined,
    variables?: Record<string, string | null>
  ) => string | undefined;
};

export const LocalizationContext = createContext<TLocalizationContext>({
  locale: localizationConfig.defaultLocale,
  setLocale: () => {},
  translate: (key: string | undefined) => key,
  t: (key: string | undefined) => key,
});

interface LocalizationProviderProps {
  children: ReactNode;
  loader?: ReactNode;
}

export const useLocalization = () => useContext(LocalizationContext);

function LocalizationProvider({ children, loader }: LocalizationProviderProps) {
  const { fallbackLocale } = localizationConfig;

  const [loading, setLoading] = useState<boolean>(true);

  const [locale, setLocale] = useState<SupportedLocale>(
    localizationConfig.defaultLocale
  );
  const [translations, setTranslations] = useState<Translation | null>(null);
  const [fallbackTranslations, setFallbackTranslations] =
    useState<Translation | null>(null);

  function flattenTranslations(
    translations: Translation,
    prefix: string = ''
  ): Translation {
    let flattened: Translation = {};

    Object.keys(translations).forEach((key) => {
      const fullKey = `${prefix}${key}`;
      if (typeof translations[key] === 'object') {
        flattened = {
          ...flattened,
          ...flattenTranslations(
            translations[key] as unknown as Translation,
            `${fullKey}.`
          ),
        };
      } else {
        flattened[fullKey] = translations[key];
      }
    });

    return flattened;
  }

  const loadTranslations = async (locale: SupportedLocale) => {
    try {
      if (!fallbackTranslations && fallbackLocale) {
        import(`../../locales/${fallbackLocale}.json`).then((data) => {
          setFallbackTranslations(flattenTranslations(data.default));
        });
      }
      import(`../../locales/${locale}.json`).then((data) => {
        setTranslations(flattenTranslations(data.default));
        setLoading(false);
      });
    } catch (error) {
      console.error(`Error loading translations for locale ${locale}:`, error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTranslations(locale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const translate = useCallback(
    (
      key: string | undefined,
      variables?: Record<string, string | null>
    ): string | undefined => {
      if (!key) return undefined;

      if (translations && translations[key]) {
        return processVariables(translations[key], variables);
      }
      if (fallbackTranslations && fallbackTranslations[key]) {
        return processVariables(fallbackTranslations[key], variables);
      }
      if (translations) {
        console.error(
          `Error loading tanslation for key ${key} in locale ${locale}.\nTranslation not found.\n`
        );
      }
      return key;
    },
    [fallbackTranslations, locale, translations]
  );

  const t = translate;

  const value = useMemo(
    () => ({ locale, setLocale, translate, t }),
    [locale, t, translate]
  );

  return (
    <LocalizationContext.Provider value={value}>
      {loading ? loader : children}
    </LocalizationContext.Provider>
  );
}

LocalizationProvider.defaultProps = {
  loader: 'Loading...',
};

export default LocalizationProvider;
