import React from "react";

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
  order: any;
  type: string; 
  payload: { 
    success: boolean;
    name: string;
    order: number; 
  };
}
export interface IInitialData {
  loading: boolean,
  isErrors: boolean,
  order: null
}

export interface IAuthReducer {
  type: any;
  user: any;
  error: any;
  status: any;
  res: { message: any; };
  message: any;
}

