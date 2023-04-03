import React from 'react';
import { v4 as uuid } from 'uuid';
import { ADD_INGREDIENTS } from './actionTypes';

export const addToConstructor = (ingredient: any) => {
  return {
    type: ADD_INGREDIENTS,
    ingredients: {
      ...ingredient,
      uuid: uuid(),
    }
  }
}