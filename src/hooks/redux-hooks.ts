import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { RootState } from 'shared/store/store';

import { endpointActions } from '../shared/store/reducers/endpointSlice';
import {
  setHeaders,
  setRequest,
  setResponse,
  setVariables,
} from '../shared/store/slices/editorSlice';

const actions = {
  ...endpointActions,
  setRequest,
  setResponse,
  setVariables,
  setHeaders,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
