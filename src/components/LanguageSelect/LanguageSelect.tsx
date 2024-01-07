import { ChangeEvent, useEffect, useState } from 'react';

import { SupportedLocale } from 'models/LocalizationConfig.interface';
import { useLocalization } from 'shared/context/LocalizationContext';
import { loadLocaleFromLS, saveLocaleToLS } from 'utils/localStorage';

import styles from './LanguageSelect.module.scss';

function LanguageSelect() {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const { setLocale } = useLocalization();

  const selectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const locale = event.target.value as SupportedLocale;
    setLocale(locale);
    setSelectedValue(locale);
    if (loadLocaleFromLS() !== locale) {
      saveLocaleToLS(locale);
    }
  };

  useEffect(() => {
    const savedValue = loadLocaleFromLS();
    if (savedValue) {
      setSelectedValue(savedValue);
    }
  }, []);

  return (
    <label htmlFor="locale">
      <select
        className={styles.locale}
        name="locale"
        id="locale"
        onChange={selectHandler}
        value={selectedValue}
      >
        <option value="en_US">en</option>
        <option value="ru_RU">ru</option>
      </select>
    </label>
  );
}

export default LanguageSelect;
