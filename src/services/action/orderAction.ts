import { PROFILE_ORDERS_ROUTE_URL } from '../../constants';
import { IWsOrder } from '../../types';
import { apiRequest } from '../../utils/api';
import { AppDispatch } from '../store';

export const ORDER_START: 'ORDER_START' = "ORDER_START";
export const ORDER_SUCCESS: 'ORDER_SUCCESS' = "ORDER_SUCCESS";
export const ORDER_ERROR: 'ORDER_ERROR' = "ORDER_ERROR";

export interface IOrderStartAction {
  type: typeof ORDER_START;
};

export interface IOrderSuccessAction {
  type: typeof ORDER_SUCCESS;
  order: IWsOrder;
};

export interface IOrderErrorAction {
  type: typeof ORDER_ERROR;
  message: string
};

export type TGetOrderActions = | 
  IOrderStartAction |
  IOrderSuccessAction |
  IOrderErrorAction
;

export function getOrder(currentNumber?: string) {
  return apiRequest(`${PROFILE_ORDERS_ROUTE_URL}/${currentNumber}`);
}

export function getOrderAction(currentNumber?: string) {
  return function(dispatch: AppDispatch) {
    dispatch({ type: ORDER_START });
    getOrder(currentNumber)
    .then((result: { orders: any[]; }) => {
      dispatch({ type: ORDER_SUCCESS, order: result.orders[0] });
    })
    .catch((error: { message: any; }) => {
      dispatch({ type: ORDER_ERROR, message: error.message });
    });
  }
};