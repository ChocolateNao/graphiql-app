import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GraphQLSchema } from 'models/GraphQLSchema.interface';

interface EndpointState {
  isConnected: boolean;
  url: string;
  takenSchema: GraphQLSchema | null;
}
const initialState: EndpointState = {
  isConnected: false,
  url: '',
  takenSchema: null,
};

const endpointSlice = createSlice({
  name: 'endpoint',
  initialState,
  reducers: {
    setIsConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
      state.isConnected = true;
    },
    setTakenSchema: (state, action: PayloadAction<GraphQLSchema | null>) => {
      if (action.payload) state.takenSchema = action.payload;
      state.isConnected = true;
    },
    resetTakenSchema: (state) => {
      state.isConnected = false;
      state.takenSchema = null;
    },
  },
});
export const endpointActions = endpointSlice.actions;
export default endpointSlice.reducer;
