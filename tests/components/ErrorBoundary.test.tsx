import { render } from '@testing-library/react';

import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';

jest.mock('components/ErrorFallback', () =>
  jest.fn(() => 'Mock ErrorFallback')
);

function MockError() {
  throw new Error('Dummy Error!');
  return <div />;
}

describe('ErrorBoundary Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children when there is no error', () => {
    const { getByText } = render(
      <ErrorBoundary fallback={<ErrorFallback />}>
        <div>Mock child</div>
      </ErrorBoundary>
    );

    expect(getByText('Mock child')).toBeInTheDocument();
    expect(ErrorFallback).not.toHaveBeenCalled();
  });

  it('renders ErrorFallback when there is an error', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(ErrorBoundary.prototype, 'componentDidCatch');

    const { getByText } = render(
      <ErrorBoundary fallback={<ErrorFallback />}>
        <div>Mock child</div>
        <MockError />
      </ErrorBoundary>
    );

    expect(ErrorFallback).toHaveBeenCalled();
    expect(getByText(/Mock ErrorFallback/i)).toBeInTheDocument();

    jest.restoreAllMocks();
  });
});
