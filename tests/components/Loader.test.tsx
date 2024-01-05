import { render } from '@testing-library/react';

import Loader from 'components/Loader';

describe('Loader Component', () => {
  it('renders the component', () => {
    const { container } = render(<Loader />);

    expect(container.querySelector('.loader-container')).toBeInTheDocument();
    expect(container.querySelector('.loader')).toBeInTheDocument();
  });
});
