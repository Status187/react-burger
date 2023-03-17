import * as React from 'react';
import { IInitialData } from '../types';

const initialData: IInitialData | any = {
  name: null,
  order: 0,
  success: false
};

export const OrderNumberContext = React.createContext(initialData)