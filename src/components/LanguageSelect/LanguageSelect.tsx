import { ChangeEvent } from 'react';

import { useLocalization } from 'shared/context/LocalizationContext';
import { SupportedLocale } from 'utils/localizationConfig';

import styles from './LanguageSelect.module.scss';

function LanguageSelect() {
  const { setLocale } = useLocalization();

  const selectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setLocale(event.target.value as SupportedLocale);
  };
  return (
    <label htmlFor="locale">
      <select
        className={styles.select}
        name="locale"
        id="locale"
        onChange={selectHandler}
      >
        <option value="en_US">EN</option>
        <option value="ru_RU">RU</option>
      </select>
    </label>
  );
}

export default LanguageSelect;
