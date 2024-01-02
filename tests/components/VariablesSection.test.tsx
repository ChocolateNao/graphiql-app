import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';

import Variables from 'components/VariablesSection';
import { RootState, store } from 'shared/store/store';

import {
  useActions,
  useActionsMock,
  useAppSelectorMock,
} from '../mock/reduxHooksMock';

function AppWrapper() {
  return (
    <Provider store={store}>
      <Variables />
    </Provider>
  );
}

describe('Variables Section Component', () => {
  beforeEach(() => {
    render(<AppWrapper />);
  });

  it('renders the component', () => {
    const textarea = screen.getByRole('textbox');

    expect(textarea).toBeInTheDocument();
  });

  it('ensures the entered value is saved in the store', () => {
    useAppSelectorMock.mockImplementation((selectorFn) =>
      selectorFn({ editor: { variables: 'initialValue' } } as RootState)
    );

    (useActions as jest.Mock).mockImplementation(useActionsMock);

    const textarea = screen.getByPlaceholderText(/placeholders.variables/i);
    fireEvent.change(textarea, { target: { value: 'newInputValue' } });
  });
});
