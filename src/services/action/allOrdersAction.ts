import { IListOrders } from "../../types";

export const ALL_ORDERS_START = "ALL_ORDERS_START";
export const ALL_ORDERS_OPEN = "ALL_ORDERS_OPEN";
export const ALL_ORDERS_END = "ALL_ORDERS_END";
export const ALL_ORDERS_SUCCESS = "ALL_ORDERS_SUCCESS";
export const ALL_ORDERS_ERROR = "ALL_ORDERS_ERROR";
export const ALL_ORDERS_CLOSED = "ALL_ORDERS_CLOSED";
export const ALL_ORDERS_MESSAGE = "ALL_ORDERS_MESSAGE";

export interface IAllOrdersStartAction {
  readonly type: typeof ALL_ORDERS_START;
  readonly url: string;
};

export interface IAllOrdersOpenAction {
  readonly type: typeof ALL_ORDERS_OPEN;
}

export interface IAllOrdersEndAction {
  readonly type: typeof ALL_ORDERS_END;
};

export interface IAllOrdersSuccessAction {
  readonly type: typeof ALL_ORDERS_SUCCESS;
};

export interface IAllOrdersErrorAction {
  readonly type: typeof ALL_ORDERS_ERROR;
  readonly error: string;
};

export interface IAllOrdersClosedAction {
  readonly type: typeof ALL_ORDERS_CLOSED;
};

export interface IAllOrdersMessageAction {
  readonly type: typeof ALL_ORDERS_MESSAGE;
  readonly message: IListOrders ;
};

export type TAllOrdersActions = 
  IAllOrdersOpenAction |
  IAllOrdersOpenAction |
  IAllOrdersEndAction |
  IAllOrdersSuccessAction |
  IAllOrdersErrorAction |
  IAllOrdersClosedAction |
  IAllOrdersMessageAction;

export interface IWsAllOrdersActions {
  onStart: typeof ALL_ORDERS_START,
  onOpen: typeof ALL_ORDERS_OPEN,
  onEnd: typeof ALL_ORDERS_END,
  onSuccess: typeof ALL_ORDERS_SUCCESS,
  onError: typeof ALL_ORDERS_ERROR,
  onClosed: typeof ALL_ORDERS_CLOSED,
  onMessage: typeof ALL_ORDERS_MESSAGE
};

export const wsAllOrdersActions: IWsAllOrdersActions = {
  onStart: ALL_ORDERS_START,
  onOpen: ALL_ORDERS_OPEN,
  onSuccess: ALL_ORDERS_SUCCESS,
  onClosed: ALL_ORDERS_CLOSED,
  onEnd: ALL_ORDERS_END,
  onError: ALL_ORDERS_ERROR,
  onMessage: ALL_ORDERS_MESSAGE
};
