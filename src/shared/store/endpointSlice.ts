import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GraphQLSchema } from 'models/GraphQLSchema.interface';

interface EndpointState {
  isConnected: boolean;
  takenSchema: GraphQLSchema | null;
}
const initialState: EndpointState = {
  isConnected: false,
  takenSchema: null,
};

const endpointSlice = createSlice({
  name: 'endpoint',
  initialState,
  reducers: {
    setIsConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setTakenSchema: (state, action: PayloadAction<GraphQLSchema>) => {
      if (action.payload) state.takenSchema = action.payload;
      state.isConnected = true;
    },
  },
});
export const endpointActions = endpointSlice.actions;
export default endpointSlice.reducer;
