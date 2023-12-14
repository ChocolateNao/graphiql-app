import React from 'react';
import ReactDOM from 'react-dom/client';

import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
import LocalizationProvider from 'shared/context/LocalizationContext';

import App from './App';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorFallback />}>
      <LocalizationProvider>
        <App />
      </LocalizationProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
