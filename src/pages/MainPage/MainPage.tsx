import { useState } from 'react';
import { useAppSelector } from 'hooks/redux-hooks';

import Headers from 'components/Headers';
import MainEndpointInput from 'components/MainEndpointInput/MainEndpointInput';
import Variables from 'components/Variables';
import { useLocalization } from 'shared/context/LocalizationContext';
import { RootState } from 'shared/store/store';
import makeGraphQLRequest from 'utils/graphql-request';

import styles from './MainPage.module.scss';

function MainPage() {
  const [request, setRequest] = useState('');
  const [response, setResponse] = useState('');
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const endpointAction = (state: RootState) => state.endpoint.url;
  const endpoint = useAppSelector(endpointAction);

  const { t } = useLocalization();

  const handleClick = (component: string) => {
    setActiveComponent(component);
  };

  const handleRequest = async () => {
    makeGraphQLRequest(endpoint, request)
      .then((res) => setResponse(JSON.stringify(res, null, 2)))
      .catch((err: Error) => setResponse(JSON.stringify(err.message, null, 2)));
  };
  const handleRequestFieldChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setRequest(value);
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard__endpoint_wrapper}>
        <MainEndpointInput />
      </div>
      <div className={styles.dashboard__wrapper}>
        <div className={styles.cell1}>
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
        <div className={styles.cell2}>
          <pre>
            <span>{response}</span>
          </pre>
        </div>
        <div className={styles.cell3}>
          <div className={styles.btn_wrapper}>
            <button type="button" onClick={() => handleClick('Variables')}>
              Variables
            </button>
            <button type="button" onClick={() => handleClick('Headers')}>
              Headers
            </button>
          </div>
          {activeComponent === 'Variables' && <Variables />}
          {activeComponent === 'Headers' && <Headers />}
        </div>
      </div>
    </div>
  );
}
export default MainPage;
