import { MemoryRouter } from 'react-router-dom';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import PasswordUpdate from 'pages/PasswordUpdate';
import LocalizationProvider from 'shared/context/LocalizationContext';

function AppWrapper() {
  return (
    <MemoryRouter>
      <LocalizationProvider>
        <PasswordUpdate />
      </LocalizationProvider>
    </MemoryRouter>
  );
}

describe('Password Update Page', () => {
  beforeEach(async () => {
    render(<AppWrapper />);

    await waitFor(() => {
      expect(screen.getAllByText('Placeholder'));
    });
  });

  it('renders the page', () => {
    expect(screen.getAllByText('Placeholder')[0]).toBeInTheDocument();
  });

  it('changes the state of the checkbox', () => {
    const showPassword = screen.getAllByRole('checkbox');
    act(() => {
      fireEvent.click(showPassword[0]);
      fireEvent.click(showPassword[1]);
    });

    expect(showPassword[0]).toBeChecked();
    expect(showPassword[1]).toBeChecked();
  });
});
