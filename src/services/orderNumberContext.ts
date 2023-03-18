import * as React from 'react';
import { IDataReduce, IInitialData } from '../types';

const initialData: IInitialData | any = {
  name: null,
  order: 0,
  success: false
};

export const OrderNumberContext = React.createContext(initialData);


export const dataReducer = (state: any, action: IDataReduce ) => {
  switch (action.type) {
    case "set":
      return { success: action.payload.success, name: action.payload.name, order: action.payload.order }
    case "reset":
      return initialData
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
};