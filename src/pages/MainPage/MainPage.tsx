import { useEffect, useState } from 'react';
import { useActions } from 'hooks/redux-hooks';
import { useDebounce } from 'use-debounce';

import { useLocalization } from 'shared/context/LocalizationContext';
import { useCachedPreflightQuery } from 'utils/graphql-connect';
import makeGraphQLRequest from 'utils/graphql-request';

import styles from './MainPage.module.scss';

function MainPage() {
  const [endpoint, setEndpoint] = useState('');
  const [request, setRequest] = useState('');
  const [response, setResponse] = useState('');
  const [endpointDebounce] = useDebounce(endpoint, 1000);

  const { setTakenSchema, resetTakenSchema } = useActions();

  const { t } = useLocalization();
  const { data, isFetching, isError, isSuccess } =
    useCachedPreflightQuery(endpointDebounce);

  const handleRequest = async () => {
    const res = await makeGraphQLRequest(endpoint, request);
    setResponse(JSON.stringify(res, null, 2));
  };
  const handleRequestFieldChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setRequest(value);
  };
  const handleEndpointChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEndpoint(value);
  };
  useEffect(() => {
    if (isSuccess) setTakenSchema(data);
    else if (isError) resetTakenSchema();
  }, [data, isError, isSuccess, resetTakenSchema, setTakenSchema]);

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard__endpoint_wrapper}>
        <label
          htmlFor="api-endpoint"
          className={styles.dashboard__endpoint_label}
        >
          {t('mainPage.lables.endpoint')}
          <input
            name="api-endpoint"
            id="api-endpoint"
            type="text"
            placeholder={t('placeholders.endpoint')}
            className={styles.dashboard__endpoint_input}
            onChange={handleEndpointChange}
          />
        </label>
        {isSuccess && <span>✔️</span>}
        {isError && <span>❌</span>}
        {isFetching && <span>⚠️</span>}
      </div>
      <div className={styles.dashboard__wrapper}>
        <div className={styles.dashboard__container}>
          <textarea
            className={styles.dashboard__textarea}
            placeholder={t('placeholders.code')}
            onChange={handleRequestFieldChange}
          />
          <button
            className={styles.dashboard__run_btn}
            type="button"
            aria-label="run-button"
            onClick={handleRequest}
          />
        </div>
        <div className={styles.dashboard__container}>
          <pre>
            <span>{response}</span>
          </pre>
        </div>
      </div>
    </div>
  );
}
export default MainPage;
