import { createSlice } from '@reduxjs/toolkit';

interface EditorState {
  request: string;
  response: string;
  variables: string;
  headers: string;
  isProxyEnabled: boolean;
}

const initialEditorState: EditorState = {
  request: '',
  response: '',
  variables: '',
  headers: '',
  isProxyEnabled: false,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState: initialEditorState,
  reducers: {
    setRequest(state, action) {
      state.request = action.payload;
    },
    setResponse(state, action) {
      state.response = action.payload;
    },
    setVariables(state, action) {
      state.variables = action.payload;
    },
    setHeaders(state, action) {
      state.headers = action.payload;
    },
    setIsProxyEnabled(state, action) {
      state.isProxyEnabled = action.payload;
    },
  },
});

export const {
  setRequest,
  setResponse,
  setVariables,
  setHeaders,
  setIsProxyEnabled,
} = editorSlice.actions;

export const editorReducer = editorSlice.reducer;
