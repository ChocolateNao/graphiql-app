import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import Header from 'components/Header';

function MockLoginPage() {
  return <>Mock Login page</>;
}

function AppWrapper() {
  return (
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
      <Routes>
        <Route index element={<Header />} />
        <Route path="login" element={<MockLoginPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Header Component', () => {
  it('renders the component', async () => {
    render(<AppWrapper />);

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).toBeNull();
    });

    const text = screen.getAllByText(/authorization/i);

    expect(text[0]).toBeInTheDocument();
  });

  it('changes the route after clicking login', async () => {
    render(<AppWrapper />);

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).toBeNull();
    });

    const loginButton = screen.getByText(/authorization.login/i);

    act(() => {
      fireEvent.click(loginButton);
    });

    expect(screen.getByText(/Mock Login page/i));
  });
});
