import { fireEvent, render, screen } from '@testing-library/react';

import ErrorFallback from 'components/ErrorFallback';

describe('Error Fallback Component', () => {
  const { reload } = window.location;

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { reload: jest.fn() },
    });
  });

  afterAll(() => {
    window.location.reload = reload;
  });

  it('renders the component', () => {
    render(<ErrorFallback />);

    const element = screen.getByText(/errorPage.errorFallback.text/i);

    expect(element).toBeInTheDocument();
  });

  it('reloads the page after clicking the button', () => {
    render(<ErrorFallback />);

    const reloadButton = screen.getByText(/errorPage.errorFallback.reload/i);
    fireEvent.click(reloadButton);

    expect(window.location.reload).toHaveBeenCalled();
  });
});
