import { render, screen } from '@testing-library/react';

import Footer from 'components/Footer';

describe('Footer Component', () => {
  it('renders the component', () => {
    render(<Footer />);

    const element = screen.getByText(/© 2023/i);
    const allLinks = screen.getAllByRole('link');
    const link = allLinks[0];

    expect(element).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://rs.school/react/');
  });
});
