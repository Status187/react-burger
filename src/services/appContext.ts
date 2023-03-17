import * as React from 'react';
import { IInitialState } from '../types';

// здесь я совсем не понял почему исходная типизация конфликтует с контекстом при передаче в провайдере value,
// то же самое в других контекстах, очень долго я бодался с ним и искал инфу, оставлю пока any
const initialState: IInitialState | any = { 
  success: false,
  data: []
};

export const BurgerConstructorContext = React.createContext(initialState)