import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import GraphQLMethod from 'shared/enums/GraphQLMethod';

interface DocsState {
  targetName: string;
  targetType: string;
  method: GraphQLMethod;
}
const initialState: DocsState = {
  targetName: 'index',
  targetType: '',
  method: GraphQLMethod.Query,
};

const docsSlice = createSlice({
  name: 'docs',
  initialState,
  reducers: {
    setDocsTargetName: (state, action: PayloadAction<string>) => {
      state.targetName = action.payload;
    },
    setDocsTargetType: (state, action: PayloadAction<string>) => {
      state.targetType = action.payload;
    },
    setDocsMethod: (state, action: PayloadAction<GraphQLMethod>) => {
      state.method = action.payload;
    },
  },
});
export const docsActions = docsSlice.actions;
export default docsSlice.reducer;
