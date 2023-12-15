import { ChangeEvent } from 'react';

import { useLocalization } from 'shared/context/LocalizationContext';
import { SupportedLocale } from 'utils/localizationConfig';

function LanguageSelect() {
  const { setLocale, t, locale } = useLocalization();

  const selectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setLocale(event.target.value as SupportedLocale);
  };
  return (
    <label htmlFor="locale">
      {`${t('settings.changeLocale')}. ${t(
        'settings.currentLocale'
      )}: ${locale} `}
      <select name="locale" id="locale" onChange={selectHandler}>
        <option value="">{t('select')}</option>
        <option value="en_US">English</option>
        <option value="ru_RU">Русский</option>
      </select>
    </label>
  );
}

export default LanguageSelect;
