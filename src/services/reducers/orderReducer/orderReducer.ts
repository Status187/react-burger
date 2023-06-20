import { IWsOrder } from '../../../types';
import { 
  ORDER_START, 
  ORDER_SUCCESS, 
  ORDER_ERROR, 
  TGetOrderActions
} from '../../action/orderAction';

interface IGetOrderState {
  requestStart: boolean;
  requestError: string | null;
  order: IWsOrder | null;
}

export const initialState: IGetOrderState = {
  requestStart: false,
  requestError: null,
  order: null
}

export function getOrderReducer(state = initialState, action: TGetOrderActions): IGetOrderState {
  switch (action.type) {
    case ORDER_START:
      return { ...state, requestStart: true, requestError: null };
    case ORDER_SUCCESS:
      return { ...state, requestStart: false, requestError: null, order: action.order };
    case ORDER_ERROR:
      return { ...state, requestStart: false, requestError: action.message, order: null };
    default:
      return state;
  }
}
