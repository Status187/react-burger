import { IOrdersState } from "../../../types";
import { TUserOrdersActions, USER_ORDERS_CLOSED, USER_ORDERS_ERROR, USER_ORDERS_MESSAGE, USER_ORDERS_SUCCESS } from "../../action/userOrdersAction";
import { initialState } from "../utils/initialState";

export function ordersUserReducer(state = initialState, action: TUserOrdersActions): IOrdersState {
  switch (action.type) {
    case USER_ORDERS_SUCCESS:
      return { ...state, error: null, wsConnected: true };
    case USER_ORDERS_ERROR:
      return { ...state, error: action.error, wsConnected: false };
    case USER_ORDERS_CLOSED:
      return { ...state, error: null, wsConnected: false };
    case USER_ORDERS_MESSAGE:
      return { ...state, error: null, message: action.message };
    default:
      return state;
  }
}
