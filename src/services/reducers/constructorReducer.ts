import { IData } from "../../types";
import { ADD_INGREDIENTS, DELETE_INGREDIENT, SET_BUNS, SORT_INGREDIENTS } from "../action/actionTypes";

const initialState = {
  bun: null,
  ingredients: [] as IData[],
}

export function constructorReducer(state = initialState, action: {
  bun: any; type: any; ingredient: IData, index: number, index1: number, index2: number; 
}) {
  switch (action.type) {
    case SET_BUNS:
      // console.log(action)
      return { ...state, bun: action.bun };
    case ADD_INGREDIENTS:
      // console.log(action)
      return { ...state, ingredients: [...state.ingredients, action.ingredient]};
    case DELETE_INGREDIENT:
      // console.log(action)
      return { ...state, ingredients: [...state.ingredients].filter((_item, index) => index !== action.index) };
    case SORT_INGREDIENTS:
      console.log(action)
      const newSortState = { ...state, ingredients: [...state.ingredients] };
      [newSortState.ingredients[action.index1], newSortState.ingredients[action.index2]] = 
      [newSortState.ingredients[action.index2], newSortState.ingredients[action.index1]];
      return newSortState;
    default:
      return state;
  }
}
