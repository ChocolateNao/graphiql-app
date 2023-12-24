import { useState } from 'react';

import Headers from 'components/Headers';
import Variables from 'components/Variables';
import { useLocalization } from 'shared/context/LocalizationContext';
import makeGraphQLRequest from 'utils/graphql-request';
import { formatQuery, formatWords, isCodeValid } from 'utils/prettify';

import styles from './MainPage.module.scss';

function MainPage() {
  const [endpoint, setEndpoint] = useState('');
  const [request, setRequest] = useState('');
  const [response, setResponse] = useState('');
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { t } = useLocalization();

  const handleClick = (component: string) => {
    setActiveComponent(component);
  };

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

  const handlePrettify = () => {
    if (!isCodeValid(request)) {
      setRequest('');
    } else {
      const res = formatWords(request);
      setRequest(formatQuery(res));
    }
  };

  const handleButtonClick = () => {
    setIsPanelOpen(!isPanelOpen);
    if (isPanelOpen) {
      setActiveComponent(null);
    }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard__endpoint_wrapper}>
        <label htmlFor="api-endpoint">
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
      </div>
      <div
        className={`${styles.dashboard__wrapper} ${
          isPanelOpen ? styles.add_grid : ''
        }`}
      >
        <div className={styles.cell1}>
          <textarea
            className={styles.dashboard__textarea}
            placeholder={t('placeholders.code')}
            value={request}
            onChange={handleRequestFieldChange}
          />
          <div>
            <button
              className={styles.dashboard__run_btn}
              type="button"
              aria-label="run-button"
              onClick={handleRequest}
            />
            <button
              type="button"
              className={styles.magic}
              aria-label="magic-button"
              onClick={handlePrettify}
            />
          </div>
        </div>
        <div className={styles.cell2}>
          <pre>
            <span>{response}</span>
          </pre>
        </div>
        <div className={styles.cell3}>
          <div className={styles.btn_wrapper}>
            <div className={styles.buttons}>
              <button
                type="button"
                aria-label="Variables"
                onClick={() => handleClick('Variables')}
                disabled={!isPanelOpen}
              >
                Variables
              </button>
              <button
                type="button"
                aria-label="Headers"
                onClick={() => handleClick('Headers')}
                disabled={!isPanelOpen}
              >
                Headers
              </button>
            </div>
            <button
              type="button"
              aria-label="open_button"
              className={`${styles.open_button} ${
                isPanelOpen ? styles.close_button : ''
              }`}
              onClick={handleButtonClick}
            />
          </div>
          {activeComponent === 'Variables' && <Variables />}
          {activeComponent === 'Headers' && <Headers />}
        </div>
      </div>
    </div>
  );
}
export default MainPage;
