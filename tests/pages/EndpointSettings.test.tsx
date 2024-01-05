import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';

import EndpointSettings from 'pages/EndpointSettings';
import LocalizationProvider from 'shared/context/LocalizationContext';

function AppWrapper() {
  return (
    <MemoryRouter>
      <LocalizationProvider>
        <EndpointSettings />
      </LocalizationProvider>
    </MemoryRouter>
  );
}

describe('Endpoint Settings Page', () => {
  it('renders the component', async () => {
    render(<AppWrapper />);

    await waitFor(() => {
      expect(screen.getAllByText(/endpoint/i));
    });

    const element = screen.getByText(/endpoint/i);

    expect(element).toBeInTheDocument();
    screen.debug();
  });
});
