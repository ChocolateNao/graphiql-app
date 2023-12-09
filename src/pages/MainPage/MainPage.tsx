import { useState } from 'react';

import makeGraphQLRequest from 'utils/graphql-request';

import styles from './MainPage.module.scss';

function MainPage() {
  const [endpoint, setEndpoint] = useState('');
  const [request, setRequest] = useState('');
  const [response, setResponse] = useState('');

  const handleRequest = async () => {
    const res = await makeGraphQLRequest(endpoint, request);
    setResponse(JSON.stringify(res));
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
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard__endpoint_wrapper}>
        <label htmlFor="api-endpoint">
          API endpoint:
          <input
            name="api-endpoint"
            id="api-endpoint"
            type="text"
            placeholder="example: https://graphql-pokemon2.vercel.app"
            className={styles.dashboard__endpoint_input}
            onChange={handleEndpointChange}
          />
        </label>
      </div>
      <div className={styles.dashboard__wrapper}>
        <div className={styles.dashboard__container}>
          <textarea
            className={styles.dashboard__textarea}
            placeholder="Enter your code here"
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
