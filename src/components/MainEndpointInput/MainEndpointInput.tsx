import { useEffect, useState } from 'react';
import { useActions, useAppSelector } from 'hooks/redux-hooks';
import { useDebounce } from 'use-debounce';

import { useLocalization } from 'shared/context/LocalizationContext';
import { RootState } from 'shared/store/store';
import { useCachedPreflightQuery } from 'utils/graphql-connect';

import styles from './MainEndpointInput.module.scss';

function MainEndpointInput() {
  const selectEndpoint = (state: RootState) => state.endpoint.url;
  const selectProxyEnabled = (state: RootState) => state.editor.isProxyEnabled;
  const endpointState = useAppSelector(selectEndpoint);
  const isProxyEnabled = useAppSelector(selectProxyEnabled);
  const [endpoint, setEndpoint] = useState(endpointState);
  const [endpointDebounce] = useDebounce(endpoint, 1000);
  const [isChecked, setChecked] = useState(isProxyEnabled);

  const { setTakenSchema, resetTakenSchema, setUrl, setIsProxyEnabled } =
    useActions();

  const { t } = useLocalization();
  const { data, isFetching, isError, isSuccess } =
    useCachedPreflightQuery(endpointDebounce);

  const handleEndpointChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEndpoint(value);
    setUrl(value);
  };

  const handleCheckboxChange = () => {
    setChecked(!isChecked);

    if (!isChecked) {
      setIsProxyEnabled(true);
    } else {
      setIsProxyEnabled(false);
    }
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
      <div className={styles.switch_container}>
        <div className={styles.btn_switch}>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <span className={styles.slider} />
          </label>
        </div>
        {t('proxy')}
      </div>
      {isSuccess && <span>✔️</span>}
      {isError && <span>❌</span>}
      {isFetching && <span>⚠️</span>}
    </>
  );
}

export default MainEndpointInput;
