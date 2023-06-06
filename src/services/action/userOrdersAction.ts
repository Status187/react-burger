import { IListOrders } from "../../types";

export const USER_ORDERS_START = "USER_ORDERS_START";
export const USER_ORDERS_OPEN = "USER_ORDERS_OPEN";
export const USER_ORDERS_END = "USER_ORDERS_END";
export const USER_ORDERS_SUCCESS = "USER_ORDERS_SUCCESS";
export const USER_ORDERS_ERROR = "USER_ORDERS_ERROR";
export const USER_ORDERS_CLOSED = "USER_ORDERS_CLOSED";
export const USER_ORDERS_MESSAGE = "USER_ORDERS_MESSAGE";

export interface IUserStartAction {
  readonly type: typeof USER_ORDERS_START;
  readonly url: string;
}

export interface IUserOpenAction {
  readonly type: typeof USER_ORDERS_OPEN;
}

export interface IUserEndAction {
  readonly type: typeof USER_ORDERS_END;
}

export interface IUserSuccessAction {
  readonly type: typeof USER_ORDERS_SUCCESS;
}

export interface IUserErrorAction {
  readonly type: typeof USER_ORDERS_ERROR;
  readonly error: string;
}

export interface IUserClosedAction {
  readonly type: typeof USER_ORDERS_CLOSED;
}

export interface IUserMessageAction {
  readonly type: typeof USER_ORDERS_MESSAGE;
  readonly message: IListOrders;
}


export type TUserOrdersActions =
  IUserStartAction |
  IUserOpenAction |
  IUserEndAction |
  IUserSuccessAction |
  IUserErrorAction |
  IUserClosedAction |
  IUserMessageAction;

export interface IWsUserOrdersActions {
  onStart: typeof USER_ORDERS_START,
  onOpen: typeof USER_ORDERS_OPEN,
  onSuccess: typeof USER_ORDERS_SUCCESS,
  onClosed: typeof USER_ORDERS_CLOSED,
  onEnd: typeof USER_ORDERS_END,
  onError: typeof USER_ORDERS_ERROR,
  onMessage: typeof USER_ORDERS_MESSAGE
}; 

export const wsOrdersUserActions: IWsUserOrdersActions = {
  onStart: USER_ORDERS_START,
  onOpen: USER_ORDERS_OPEN,
  onSuccess: USER_ORDERS_SUCCESS,
  onClosed: USER_ORDERS_CLOSED,
  onEnd: USER_ORDERS_END,
  onError: USER_ORDERS_ERROR,
  onMessage: USER_ORDERS_MESSAGE
}; 