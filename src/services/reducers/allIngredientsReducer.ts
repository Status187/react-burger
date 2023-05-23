import { IData } from "../../types";
import { SAVE_INGREDIENTS, SET_ACTIVE } from "../action/actionTypes";

const initialState = {
  list: [] as IData[],
  currentActive: null
};

export function allIngredientsReducer(state = initialState, action: { type: string; list: any; item: any; }) {
  switch (action.type) {
    case SAVE_INGREDIENTS:
      return { ...state, list: action.list };
    case SET_ACTIVE:
      console.log(action.item)
      return { ...state, currentActive: action.item };
    default:
      return state;
  }
};
