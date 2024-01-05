import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';

import Reset from 'pages/Reset';
import LocalizationProvider from 'shared/context/LocalizationContext';

function AppWrapper() {
  return (
    <MemoryRouter>
      <LocalizationProvider>
        <Reset />
      </LocalizationProvider>
    </MemoryRouter>
  );
}

describe('Reset Page', () => {
  beforeEach(async () => {
    render(<AppWrapper />);

    await waitFor(() => {
      expect(screen.getAllByText('Placeholder'));
    });
  });

  it('renders the page', () => {});
});
