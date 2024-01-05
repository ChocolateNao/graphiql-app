import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';

import WelcomePage from 'pages/WelcomePage';
import LocalizationProvider from 'shared/context/LocalizationContext';

function AppWrapper() {
  return (
    <MemoryRouter>
      <LocalizationProvider>
        <WelcomePage />
      </LocalizationProvider>
    </MemoryRouter>
  );
}

describe('Welcome Page', () => {
  beforeEach(async () => {
    render(<AppWrapper />);

    await waitFor(() => {
      expect(screen.getAllByText(/Welcome/i));
    });
  });

  it('renders the page', () => {
    const element = screen.getAllByRole('img');

    expect(element[0]).toBeInTheDocument();
  });
});
