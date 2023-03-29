import { IData } from "../../types";
import { ADD_INGREDIENTS, DELETE_INGREDIENT, SET_AMOUNT, SET_BUNS, SORT_INGREDIENTS } from "../action/actionTypes";

const initialState = {
  bun: null,
  ingredients: [] as IData[],
  amount: 0
}

export function constructorReducer(state = initialState, action: {
  amount: number;
  bun: any;
  type: any;
  ingredient: IData;
  index: number;
  indexCurrent: number;
  indexNext: number; 
}) {
  switch (action.type) {
    case SET_BUNS:
      return { ...state, bun: action.bun };
    case ADD_INGREDIENTS:
      return { ...state, ingredients: [...state.ingredients, action.ingredient]};
    case DELETE_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients].filter((_item, index) => index !== action.index) };
    case SORT_INGREDIENTS:
      const newSortState = { ...state, ingredients: [...state.ingredients] };
      [newSortState.ingredients[action.indexCurrent], newSortState.ingredients[action.indexNext]] = 
      [newSortState.ingredients[action.indexNext], newSortState.ingredients[action.indexCurrent]];
      return newSortState;
    case SET_AMOUNT:
      return { ...state, amount: action.amount}
    default:
      return state;
  }
}
