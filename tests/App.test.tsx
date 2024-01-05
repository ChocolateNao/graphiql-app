import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';

import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
import LocalizationProvider from 'shared/context/LocalizationContext';
import { store } from 'shared/store/store';

import App from '../src/App';

function AppWrapper() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Provider store={store}>
        <LocalizationProvider>
          <App />
        </LocalizationProvider>
      </Provider>
    </ErrorBoundary>
  );
}

describe('App Test', () => {
  it('renders the app', async () => {
    render(<AppWrapper />);

    await waitFor(() => {
      expect(screen.getAllByText('Welcome'));
    });

    const element = screen.getAllByText(/Welcome/i);

    expect(element[0]).toBeInTheDocument();
  });
});
