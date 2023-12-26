import { ChangeEvent } from 'react';

import { useLocalization } from 'shared/context/LocalizationContext';
import { SupportedLocale } from 'utils/localizationConfig';

import styles from './LanguageSelect.module.scss';

function LanguageSelect() {
  const { setLocale, t } = useLocalization();

  const selectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setLocale(event.target.value as SupportedLocale);
  };
  return (
    <label htmlFor="locale">
      {`${t('settings.currentLocale')}`}
      <select
        className={styles.locale}
        name="locale"
        id="locale"
        onChange={selectHandler}
      >
        <option value="en_US">English</option>
        <option value="ru_RU">Русский</option>
      </select>
    </label>
  );
}

export default LanguageSelect;
