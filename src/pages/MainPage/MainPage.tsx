import { useState } from 'react';
import { useActions, useAppSelector } from 'hooks/redux-hooks';

import Documentation from 'components/Documentation/Documentation';
import Headers from 'components/HeadersSection';
import MainEndpointInput from 'components/MainEndpointInput/MainEndpointInput';
import Variables from 'components/VariablesSection';
import { useLocalization } from 'shared/context/LocalizationContext';
import { RootState } from 'shared/store/store';
import makeGraphQLRequest from 'utils/graphql-request';
import { formatQuery, isCodeValid } from 'utils/prettify';

import styles from './MainPage.module.scss';

function MainPage() {
  const selectRequest = (state: RootState) => state.editor.request;
  const selectResponse = (state: RootState) => state.editor.response;
  const selectVariables = (state: RootState) => state.editor.variables;
  const selectHeaders = (state: RootState) => state.editor.headers;
  const selectEndpoint = (state: RootState) => state.endpoint.url;
  const selectDocsIsOpened = (state: RootState) => state.docs.isOpened;
  const selectIsFetching = (state: RootState) => state.editor.isFetching;
  const request = useAppSelector(selectRequest);
  const response = useAppSelector(selectResponse);
  const variables = useAppSelector(selectVariables);
  const headers = useAppSelector(selectHeaders);
  const endpoint = useAppSelector(selectEndpoint);
  const isDocsOpen = useAppSelector(selectDocsIsOpened);
  const isFetching = useAppSelector(selectIsFetching);
  const { setRequest, setResponse, setIsOpened, setIsFetching } = useActions();
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isButtonVariablesClicked, setIsButtonVariablesClicked] =
    useState(false);
  const [isButtonHeadersClicked, setIsButtonHeadersClicked] = useState(false);

  const { t } = useLocalization();

  const selectIsProxyEnabled = (state: RootState) =>
    state.editor.isProxyEnabled;
  const isProxyEnabled = useAppSelector(selectIsProxyEnabled);

  const handleClick = (component: string) => {
    setActiveComponent(component);
    if (component === 'Variables') {
      setIsButtonVariablesClicked(true);
      setIsButtonHeadersClicked(false);
    } else {
      setIsButtonVariablesClicked(false);
      setIsButtonHeadersClicked(true);
    }
  };

  const handleButtonClick = () => {
    setIsPanelOpen(!isPanelOpen);
    if (isPanelOpen) {
      setActiveComponent(null);
      setIsButtonVariablesClicked(false);
      setIsButtonHeadersClicked(false);
    }
  };

  const handleDocumentationButtonClick = () => {
    setIsOpened(!isDocsOpen);
  };

  const handleRequest = async () => {
    setIsFetching(true);
    makeGraphQLRequest(
      endpoint,
      request,
      t('toaster.errors.wrongVariables'),
      t('toaster.errors.wrongHeaders'),
      variables,
      headers,
      isProxyEnabled
    )
      .then((res) => {
        setResponse(JSON.stringify(res, null, 2));
        setIsFetching(false);
      })
      .catch((err: Error) => {
        setResponse(JSON.stringify(err.message, null, 2));
        setIsFetching(false);
      });
  };
  const handleRequestFieldChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setRequest(value);
  };

  const handlePrettify = () => {
    if (!isCodeValid(request)) {
      setRequest('');
    } else {
      setRequest(formatQuery(request));
    }
  };

  return (
    <main className={styles.dashboard}>
      <div className={styles.dashboard__endpoint_wrapper}>
        <MainEndpointInput />
      </div>
      <div className={styles.dashboard__wrapper}>
        <div className={styles.column1}>
          <div className={styles.docs__wrapper}>
            <div className={styles.buttons_wrapper}>
              <button
                type="button"
                className={styles.icon_doc}
                aria-label="Open Docs"
                onClick={handleDocumentationButtonClick}
              />
            </div>
            {isDocsOpen && <Documentation />}
          </div>
        </div>
        <div className={styles.column2}>
          <div
            className={`${styles.row1} ${
              isPanelOpen ? styles.remove_height : styles.height_row1
            }`}
          >
            <textarea
              spellCheck="false"
              className={styles.dashboard__textarea}
              placeholder={t('placeholders.code')}
              value={request}
              onChange={handleRequestFieldChange}
              name="request-textarea"
            />
            <div className={styles.dashboard__buttons}>
              <button
                className={styles.dashboard__run_btn}
                type="button"
                aria-label="run-button"
                onClick={handleRequest}
              />
              <button
                className={styles.dashboard__prettify_btn}
                type="button"
                aria-label="run-prettify"
                onClick={handlePrettify}
              />
            </div>
          </div>
          <div
            className={`${styles.row2} ${
              isPanelOpen ? styles.add_height : styles.height_row2
            }`}
          >
            <div className={styles.row2_wrapper}>
              <div className={styles.btn_wrapper}>
                <button
                  className={`${isButtonVariablesClicked ? styles.active : ''}`}
                  type="button"
                  onClick={() => handleClick('Variables')}
                  disabled={!isPanelOpen}
                >
                  {t('mainPage.variablesSwitch')}
                </button>
                <button
                  className={`${isButtonHeadersClicked ? styles.active : ''}`}
                  type="button"
                  onClick={() => handleClick('Headers')}
                  disabled={!isPanelOpen}
                >
                  {t('mainPage.headersSwitch')}
                </button>
              </div>
              {activeComponent === 'Variables' && <Variables />}
              {activeComponent === 'Headers' && <Headers />}
            </div>

            <button
              className={`${styles.close_button} ${
                isPanelOpen ? styles.open_button : ''
              }`}
              type="button"
              aria-label="button-close-open"
              onClick={handleButtonClick}
            />
          </div>
        </div>

        <div className={styles.column3}>
          <div className={styles.title}>{t('mainPage.response')}</div>
          <pre>
            <span className={styles.response}>
              {isFetching ? <div>{t('loading')}</div> : response}
            </span>
          </pre>
        </div>
      </div>
    </main>
  );
}
export default MainPage;
