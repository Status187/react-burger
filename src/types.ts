import React from "react";

export interface IData {
  _id?: string,
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
  data: IData[];
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
}

