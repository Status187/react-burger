import { IOrdersState } from '../../../types';
import { ALL_ORDERS_CLOSED, ALL_ORDERS_ERROR, ALL_ORDERS_MESSAGE, ALL_ORDERS_SUCCESS, TAllOrdersActions } from '../../action/allOrdersAction';
import { initialState } from '../utils/initialState';

export function allOrdersReducer(state = initialState, action: TAllOrdersActions): IOrdersState {
  switch (action.type) {
    case ALL_ORDERS_SUCCESS:
      return { ...state, error: null, wsConnected: true };
    case ALL_ORDERS_ERROR:
      return { ...state, error: action.error, wsConnected: false };
    case ALL_ORDERS_CLOSED:
      return { ...state, error: null, wsConnected: false };
    case ALL_ORDERS_MESSAGE:
      return { ...state, error: null, message: action.message };
    default:
      return state;
  }
}
