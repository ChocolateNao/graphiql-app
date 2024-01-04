import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';

import Register from 'pages/Register';
import LocalizationProvider from 'shared/context/LocalizationContext';

function AppWrapper() {
  return (
    <MemoryRouter>
      <LocalizationProvider>
        <Register />
      </LocalizationProvider>
    </MemoryRouter>
  );
}

describe('Register Page', () => {
  beforeEach(async () => {
    render(<AppWrapper />);

    await waitFor(() => {
      expect(screen.getAllByText('Placeholder'));
    });
  });

  it('renders the page', () => {
    expect(screen.getAllByText('Placeholder')[0]).toBeInTheDocument();
  });
});
