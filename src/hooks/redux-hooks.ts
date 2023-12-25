import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { RootState } from 'shared/store/store';

import { endpointActions } from '../shared/store/endpointSlice';

const actions = {
  ...endpointActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
