import { configureStore } from '@reduxjs/toolkit';

import { preflight } from 'utils/graphql-connect';

import docsSlice from './slices/docsSlice';
import { editorReducer } from './slices/editorSlice';
import endpointSlice from './slices/endpointSlice';

export const store = configureStore({
  reducer: {
    [preflight.reducerPath]: preflight.reducer,
    endpoint: endpointSlice,
    editor: editorReducer,
    docs: docsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(preflight.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
