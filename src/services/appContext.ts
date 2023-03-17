import * as React from 'react';
import { IInitialState } from '../types';

const initialState: IInitialState | any = { 
  success: false,
  data: []
};

export const BurgerConstructorContext = React.createContext(initialState)