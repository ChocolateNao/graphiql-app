import { useActions, useAppSelector } from 'hooks/redux-hooks';

import { RootState } from 'shared/store/store';

import styles from './Headers.module.scss';

function Headers() {
  const selectHeaders = (state: RootState) => state.editor.variables;
  const headers = useAppSelector(selectHeaders);
  const { setHeaders } = useActions();

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHeaders(event.target.value);
  };
  return (
    <textarea
      className={styles.headers__textarea}
      placeholder="Enter headers"
      value={headers}
      onChange={handleInputChange}
    />
  );
}

export default Headers;
