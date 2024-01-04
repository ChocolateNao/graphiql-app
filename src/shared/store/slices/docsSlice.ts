import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DocsState {
  isOpened: boolean;
  page: string;
}
const initialState: DocsState = {
  isOpened: false,
  page: 'index',
};

const docsSlice = createSlice({
  name: 'docs',
  initialState,
  reducers: {
    setDocsIsOpened: (state, action: PayloadAction<boolean>) => {
      state.isOpened = action.payload;
      state.page = 'index';
    },
    setDocsPage: (state, action: PayloadAction<string>) => {
      state.page = action.payload;
    },
  },
});
export const docsActions = docsSlice.actions;
export default docsSlice.reducer;
