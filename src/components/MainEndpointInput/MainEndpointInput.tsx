import { useEffect, useState } from 'react';
import { useActions } from 'hooks/redux-hooks';
import { useDebounce } from 'use-debounce';

import { useLocalization } from 'shared/context/LocalizationContext';
import { useCachedPreflightQuery } from 'utils/graphql-connect';

import styles from './MainEndpointInput.module.scss';

interface EndpointInputProps {
  endpointState: string;
}

function MainEndpointInput(props: EndpointInputProps) {
  const { endpointState } = props;
  const [endpoint, setEndpoint] = useState(endpointState);
  const [endpointDebounce] = useDebounce(endpoint, 1000);

  const { setTakenSchema, resetTakenSchema, setUrl } = useActions();

  const { t } = useLocalization();
  const { data, isFetching, isError, isSuccess } =
    useCachedPreflightQuery(endpointDebounce);

  const handleEndpointChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEndpoint(value);
    setUrl(value);
  };

  useEffect(() => {
    if (isSuccess) setTakenSchema(data);
    else if (isError) resetTakenSchema();
  }, [
    data,
    endpointState,
    isError,
    isSuccess,
    resetTakenSchema,
    setTakenSchema,
  ]);

  return (
    <>
      <label
        htmlFor="api-endpoint"
        className={styles.dashboard__endpoint_label}
      >
        {t('mainPage.lables.endpoint')}
        <input
          name="api-endpoint"
          id="api-endpoint"
          type="text"
          value={endpointState}
          placeholder={t('placeholders.endpoint')}
          className={styles.dashboard__endpoint_input}
          onChange={handleEndpointChange}
        />
      </label>
      {isSuccess && <span>✔️</span>}
      {isError && <span>❌</span>}
      {isFetching && <span>⚠️</span>}
    </>
  );
}

export default MainEndpointInput;
