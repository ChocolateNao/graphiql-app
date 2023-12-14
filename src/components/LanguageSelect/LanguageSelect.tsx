import { ChangeEvent } from 'react';

import { useLocalization } from 'shared/context/LocalizationContext';
import { SupportedLocale } from 'utils/localizationConfig';

function LanguageSelect() {
  const { setLocale } = useLocalization();
  const selectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setLocale(event.target.value as SupportedLocale);
  };
  return (
    <label htmlFor="locale">
      Select Locale
      <select name="locale" id="locale" onChange={selectHandler}>
        <option value="en_US">English</option>
        <option value="ru_RU">Russian</option>
      </select>
    </label>
  );
}

export default LanguageSelect;
