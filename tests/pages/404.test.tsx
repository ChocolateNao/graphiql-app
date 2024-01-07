import { render, screen } from '@testing-library/react';

import NotFoundPage from 'pages/404';

describe('Not Found Page Tests', () => {
  it('renders the page', () => {
    render(<NotFoundPage />);

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
