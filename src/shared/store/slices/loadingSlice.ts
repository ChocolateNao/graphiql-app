import { createSlice } from '@reduxjs/toolkit';

import ILoadingState from 'models/LoadingState.interface';

const initialLoadingState: ILoadingState = {
  isFetchingQueryRaw: false,
  isFetchingQueryProxy: false,
  isLoadingLocale: false,
  isLoadingAuth: false,
};
const loadingSlice = createSlice({
  name: 'loading',
  initialState: initialLoadingState,
  reducers: {
    setFetchingQueryRaw(state, action) {
      state.isFetchingQueryRaw = action.payload;
    },
    setFetchingQueryProxy(state, action) {
      state.isFetchingQueryProxy = action.payload;
    },
    setLoadingLocale(state, action) {
      state.isLoadingLocale = action.payload;
    },
    setLoadingAuth(state, action) {
      state.isLoadingAuth = action.payload;
    },
  },
});

export default loadingSlice.reducer;

export const {
  setFetchingQueryRaw,
  setFetchingQueryProxy,
  setLoadingLocale,
  setLoadingAuth,
} = loadingSlice.actions;
