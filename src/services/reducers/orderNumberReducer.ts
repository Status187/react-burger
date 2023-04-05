import { IInitialData } from '../../types';
import { SET_CLEAR_ORDER, SET_ORDER_ERROR, SET_ORDER_REQUEST, SET_ORDER_SUCCESS } from '../action/orderNumberAction';

const initialState: IInitialData = {
  loading: false,
  isErrors: false,
  order: null
};

export const orderNumberReducer = (state = initialState, action: { type: any; order: any; } ) => {
  switch (action.type) {
    case SET_ORDER_REQUEST:
      return { ...state, loading: true, isErrors: false };
    case SET_ORDER_SUCCESS:
      return { ...state, loading: false, isErrors: false, order: action.order };
    case SET_ORDER_ERROR:
      return { ...state, loading: false, isErrors: true, order: initialState.isErrors };
    case SET_CLEAR_ORDER:
      return initialState
    default:
      return state;
  }
};