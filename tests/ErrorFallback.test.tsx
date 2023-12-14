import { render, screen } from '@testing-library/react';

import ErrorFallback from 'components/ErrorFallback';

describe('Error Fallback Component', () => {
  it('renders the component', () => {
    render(<ErrorFallback />);

    const element = screen.getByText(/errorPage.errorFallback.text/i);

    expect(element).toBeInTheDocument();
  });
});
