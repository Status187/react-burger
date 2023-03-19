import * as React from 'react';
import { IDataState, IInitialState } from '../types';

// здесь я совсем не понял почему исходная типизация конфликтует с контекстом при передаче в провайдере value,
// то же самое в других контекстах, очень долго я бодался с ним и искал инфу, оставлю пока any
const initialState: IInitialState | any = { 
  success: false,
  data: []
};

export const BurgerConstructorContext = React.createContext(initialState);

export function reducer(state: any, action: IDataState) {
  switch (action.type) {
    case "set":
      return { success: action.payload.success, data: action.payload.data };
    case "reset":
      return initialState 
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
};