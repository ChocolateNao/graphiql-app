import { ChangeEvent } from 'react';

import { SupportedLocale } from 'models/LocalizationConfig.interface';
import { useLocalization } from 'shared/context/LocalizationContext';
import { saveLocaleToLS } from 'utils/localstorage';

import styles from './LanguageSelect.module.scss';

function LanguageSelect() {
  const { setLocale } = useLocalization();

  const selectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const locale = event.target.value as SupportedLocale;
    setLocale(locale);
    saveLocaleToLS(locale);
  };
  return (
    <label htmlFor="locale">
      <select
        className={styles.locale}
        name="locale"
        id="locale"
        onChange={selectHandler}
      >
        <option value="en_US">en</option>
        <option value="ru_RU">ru</option>
      </select>
    </label>
  );
}

export default LanguageSelect;
