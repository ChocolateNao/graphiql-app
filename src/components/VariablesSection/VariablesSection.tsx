import { useActions, useAppSelector } from 'hooks/redux-hooks';

import { useLocalization } from 'shared/context/LocalizationContext';
import { RootState } from 'shared/store/store';

import styles from './VariablesSection.module.scss';

function Variables() {
  const { t } = useLocalization();
  const selectVariables = (state: RootState) => state.editor.variables;
  const variables = useAppSelector(selectVariables);
  const { setVariables } = useActions();

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVariables(event.target.value);
  };

  return (
    <textarea
      className={styles.variables__textarea}
      placeholder={t('placeholders.variables')}
      value={variables}
      onChange={handleInputChange}
    />
  );
}

export default Variables;
