import { MemoryRouter } from 'react-router-dom';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import Login from 'pages/Login';
import LocalizationProvider from 'shared/context/LocalizationContext';
import * as utils from 'utils/firebase';

function AppWrapper() {
  return (
    <MemoryRouter>
      <LocalizationProvider>
        <Login />
      </LocalizationProvider>
    </MemoryRouter>
  );
}

jest.mock('utils/firebase', () => ({
  ...jest.requireActual('utils/firebase'),
  logInWithEmailAndPassword: jest.fn(),
}));

describe('Login Page Tests', () => {
  beforeEach(async () => {
    render(<AppWrapper />);

    await waitFor(() => {
      expect(screen.getAllByText('Placeholder'));
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the page properly', async () => {
    const placeholderText = screen.getAllByText('Placeholder');

    expect(placeholderText[0]).toBeInTheDocument();
  });

  it('changes the state of the checkbox', () => {
    const showPassword = screen.getByRole('checkbox');
    act(() => {
      fireEvent.click(showPassword);
    });

    expect(showPassword).toBeChecked();
  });

  it('handles submit', () => {
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getAllByRole('button');

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'aaaa@gmail.com' } });
      fireEvent.change(passwordInput, { target: { value: '12@!Qwdf12' } });
      fireEvent.click(submitButton[0]);
    });

    expect(utils.logInWithEmailAndPassword).not.toHaveBeenCalled();
  });
});
