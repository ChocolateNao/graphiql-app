import { configureStore } from '@reduxjs/toolkit';

import endpointSlice from './endpointSlice';

export const store = configureStore({
  reducer: {
    endpoint: endpointSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
