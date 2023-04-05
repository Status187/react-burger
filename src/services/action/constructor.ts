import { v4 as uuid } from 'uuid';
import { IData } from '../../types';
import { ADD_INGREDIENTS } from './actionTypes';

export const addToConstructor = (ingredient: IData) => {
  return {
    type: ADD_INGREDIENTS,
    ingredient: {
      ...ingredient,
      uuid: uuid(),
    }
  }
}