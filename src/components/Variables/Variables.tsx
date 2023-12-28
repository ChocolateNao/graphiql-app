import { useActions, useAppSelector } from 'hooks/redux-hooks';

import { RootState } from 'shared/store/store';

import styles from './Variables.module.scss';

function Variables() {
  const selectVariables = (state: RootState) => state.editor.variables;
  const variables = useAppSelector(selectVariables);
  const { setVariables } = useActions();

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVariables(event.target.value);
  };

  return (
    <textarea
      className={styles.variables__textarea}
      placeholder="Enter variables"
      value={variables}
      onChange={handleInputChange}
    />
  );
}

export default Variables;
