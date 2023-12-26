import { configureStore } from '@reduxjs/toolkit';

import { preflight } from 'utils/graphql-connect';

import endpointSlice from './reducers/endpointSlice';

export const store = configureStore({
  reducer: {
    [preflight.reducerPath]: preflight.reducer,
    endpoint: endpointSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(preflight.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
