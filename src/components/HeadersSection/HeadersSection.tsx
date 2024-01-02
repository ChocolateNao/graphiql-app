import { useActions, useAppSelector } from 'hooks/redux-hooks';

import { useLocalization } from 'shared/context/LocalizationContext';
import { RootState } from 'shared/store/store';

import styles from './HeadersSection.module.scss';

function Headers() {
  const { t } = useLocalization();
  const selectHeaders = (state: RootState) => state.editor.variables;
  const headers = useAppSelector(selectHeaders);
  const { setHeaders } = useActions();

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHeaders(event.target.value);
  };
  return (
    <textarea
      className={styles.headers__textarea}
      placeholder={t('placeholders.headers')}
      value={headers}
      onChange={handleInputChange}
    />
  );
}

export default Headers;
