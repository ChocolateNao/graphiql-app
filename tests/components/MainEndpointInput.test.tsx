import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MainEndpointInput from 'components/MainEndpointInput';
import { store } from 'shared/store/store';

function AppWrapper() {
  return (
    <Provider store={store}>
      <MainEndpointInput />
    </Provider>
  );
}

describe('MainEndpointInput Component', () => {
  beforeEach(() => {
    userEvent.setup();
    render(<AppWrapper />);
  });

  it('renders the component', () => {
    const label = screen.getByLabelText(/mainPage.lables.endpoint/i);
    const input = screen.getByRole('textbox');

    expect(label).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'api-endpoint');
  });

  it('handles the input change correctly', () => {
    const input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'testEndpointURL' } });

    expect(input.value).toBe('testEndpointURL');
  });
});
