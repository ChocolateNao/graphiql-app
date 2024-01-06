import { Provider } from 'react-redux';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';

import Documentation from 'components/Documentation/Documentation';
import LocalizationProvider from 'shared/context/LocalizationContext';
import GraphQLMethod from 'shared/enums/GraphQLMethod';
import { RootState, store } from 'shared/store/store';

import { useAppSelector } from '../mock/reduxHooksMock';
import schemaMock from '../mock/schemaMock';

const mockStore = configureMockStore<RootState>([]);

describe('Documentation Component', () => {
  it('renders the component', async () => {
    render(
      <Provider store={store}>
        <LocalizationProvider>
          <Documentation />
        </LocalizationProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Documentation/i));
    });

    expect(screen.getByText(/API is not connected/i)).toBeInTheDocument();
  });

  it('displays the docs section with data', async () => {
    const initialState = {
      docs: {
        targetName: 'index',
        targetType: 'type',
        method: GraphQLMethod.Query,
      },
      endpoint: {
        url: 'test.com/graphql',
        isConnected: true,
        takenSchema: schemaMock,
      },
    } as RootState;
    const storeMock = mockStore(initialState);

    render(
      <Provider store={storeMock}>
        <LocalizationProvider>
          <Documentation />
        </LocalizationProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Documentation/i));
    });

    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector(store.getState())
    );

    expect(screen.getByText('Documentation')).toBeInTheDocument();
    expect(screen.getByText('Characters')).toBeInTheDocument();
  });

  it('opens the requested type definition', async () => {
    const initialState = {
      docs: {
        targetName: 'index',
        targetType: 'type',
        method: GraphQLMethod.Query,
      },
      endpoint: {
        url: 'test.com/graphql',
        isConnected: true,
        takenSchema: schemaMock,
      },
    } as RootState;
    const storeMock = mockStore(initialState);

    render(
      <Provider store={storeMock}>
        <LocalizationProvider>
          <Documentation />
        </LocalizationProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Documentation/i));
    });

    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector(store.getState())
    );

    const button = screen.getAllByRole('button');
    fireEvent.click(button[0]);
  });

  it('renders the type description page', async () => {
    const initialState = {
      docs: {
        targetName: 'characters',
        targetType: 'Characters',
        method: GraphQLMethod.Query,
      },
      endpoint: {
        url: 'test.com/graphql',
        isConnected: true,
        takenSchema: schemaMock,
      },
    } as RootState;
    const storeMock = mockStore(initialState);

    render(
      <Provider store={storeMock}>
        <LocalizationProvider>
          <Documentation />
        </LocalizationProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Documentation/i));
    });

    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector(store.getState())
    );

    expect(screen.getByText('Documentation')).toBeInTheDocument();
    expect(
      screen.getByText('Get the list of all characters')
    ).toBeInTheDocument();

    const filterBtn = screen.getByText(/FilterCharacter/i);
    fireEvent.click(filterBtn);
  });

  it('renders the type text description', async () => {
    const initialState = {
      docs: {
        targetName: 'page',
        targetType: 'Int',
        method: GraphQLMethod.Query,
      },
      endpoint: {
        url: 'test.com/graphql',
        isConnected: true,
        takenSchema: schemaMock,
      },
    } as RootState;
    const storeMock = mockStore(initialState);

    render(
      <Provider store={storeMock}>
        <LocalizationProvider>
          <Documentation />
        </LocalizationProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Documentation/i));
    });

    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector(store.getState())
    );

    expect(screen.getByText('Documentation')).toBeInTheDocument();
    expect(
      screen.getByText(
        'The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.'
      )
    ).toBeInTheDocument();

    const returnBtn = screen.getByText(/return/i);
    fireEvent.click(returnBtn);
  });
});
