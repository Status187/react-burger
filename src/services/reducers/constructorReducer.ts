import { IData } from "../../types";
import { ADD_INGREDIENTS } from "../action/actionTypes";

const initialState = {
  ingredients: [] as IData[],
}

export function constructorReducer(state = initialState, action: { type: any; ingredient: IData; }) {
  switch (action.type) {
    case ADD_INGREDIENTS:
      return { ...state, ingredients: [...state.ingredients, action.ingredient]};
    default:
      return state;
  }
}
