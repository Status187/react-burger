import { BUN } from "../../constants";
import { SET_TARGET_TAB } from "../action/actionTypes";

const initialState = {
  tab: BUN
}

export function tabReducer(state = initialState, action: { type: string; tab: any; }) {
  switch (action.type) {
    case SET_TARGET_TAB:
      return { ...state, tab: action.tab };
    default:
      return state;
  }
}
