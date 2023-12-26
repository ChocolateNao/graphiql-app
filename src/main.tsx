import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
import LocalizationProvider from 'shared/context/LocalizationContext';
import { store } from 'shared/store/store';

import App from './App';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Provider store={store}>
        <LocalizationProvider>
          <App />
        </LocalizationProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
