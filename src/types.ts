import React from "react";
import { IWsAllOrdersActions, TAllOrdersActions } from "./services/action/allOrdersAction";
import { IWsUserOrdersActions, TUserOrdersActions } from "./services/action/userOrdersAction";

export interface IData {
  uuid: string;
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string
  image_mobile: string,
  image_large: string,
  v?: number
};

export type TCount = IData & {
  quantity: number;
}

export type TCardElement = {
  bunsRef: React.RefObject<HTMLDivElement>,
  soucesRef: React.RefObject<HTMLDivElement>,
  fillingsRef: React.RefObject<HTMLDivElement>
};
export interface IModal {
  children: React.ReactNode;
  onClose?: () => void
};
export interface IElement {
  calories: number,
  carbohydrates: number,
  fat: number,
  proteins: number,
  image_large: string,
  name: string
};
export interface IModalOverlay {
  onClose: () => void,
  forwardRef: React.RefObject<HTMLDivElement>
};
export interface IDataState {
  type: string;
  payload: {
    success: boolean;
    data: IData[];
  }
};
export interface IInitialState {
  success: boolean;
  data: IData[];
};
export interface IInfoAmount {
  onClick: () => void
}
export interface IDataReduce {
  order: number;
  type: string;
  payload: {
    success: boolean;
    name: string;
    order: number;
  };
};
export interface IInitialData {
  loading: boolean,
  isErrors: boolean,
  order: null
};

export interface IUser {
  email: string;
  name: string;
};
export interface IAuthReducer {
  type: string;
  user: IUser[];
  error: string;
  status: string;
  res: { message: string; };
  message: string;
};

export interface IInitialStateAuth {
  user: {
    email: string;
    name: string;
    password?: string;
  };
  status: null;
  registerRequest: boolean;
  registerSuccess: boolean;
  registerFailure: boolean;
  loginRequest: boolean;
  loginFailure: boolean;
  logoutRequest: boolean;
  logoutFailed: boolean;
  getUserRequest: boolean;
  getUserFailure: boolean;
  editUserRequest: boolean;
  editUserSuccess: boolean;
  editUserFailure: boolean;
};

export interface IWsOrder {
  ingredients: string[];
  _id: string;
  status: string;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type AppActions = TAllOrdersActions | TUserOrdersActions;

export interface IListOrders  {
  orders: IWsOrder[];
  total: number;
  totalToday: number;
};

export type wsActionsTypes = IWsAllOrdersActions | IWsUserOrdersActions;
export interface IOrdersState {
  wsConnected: boolean;
  message: IListOrders | null;
  error: string | null;
};
