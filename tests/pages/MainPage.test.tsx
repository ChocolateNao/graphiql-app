import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';

import MainPage from 'pages/MainPage';
import LocalizationProvider from 'shared/context/LocalizationContext';
import { store } from 'shared/store/store';

function AppWrapper() {
  return (
    <MemoryRouter>
      <Provider store={store}>
        <LocalizationProvider>
          <MainPage />
        </LocalizationProvider>
      </Provider>
    </MemoryRouter>
  );
}

describe('Main Page', () => {
  beforeEach(async () => {
    render(<AppWrapper />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Enter your Graph QL API endpoint'));
    });
  });

  it('renders the page', () => {
    const element = screen.getByPlaceholderText(
      /Enter your Graph QL API endpoint/i
    );
    expect(element).toBeInTheDocument();
  });
});
