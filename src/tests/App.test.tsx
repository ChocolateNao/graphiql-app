import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import App from '../App';

describe('App Component', () => {
  it('renders the App component', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const textElement = getByText('Hello World');

    expect(textElement).toBeInTheDocument();
  });
});
