import { createSlice } from '@reduxjs/toolkit';

interface EditorState {
  request: string;
  response: string;
  variables: string;
  headers: string;
}

const initialEditorState: EditorState = {
  request: '',
  response: '',
  variables: '',
  headers: '',
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
  },
});

export const { setRequest, setResponse, setVariables, setHeaders } =
  editorSlice.actions;

export const editorReducer = editorSlice.reducer;
