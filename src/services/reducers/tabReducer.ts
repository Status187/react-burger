import { BUN } from "../../ constants";
import { SET_TARGET_TAB } from "../action/tabAction";

const initialState = {
    tab: BUN
}

export function tabReducer(state = initialState, action: { type: any; tab: any; }) {
    switch (action.type) {
        case SET_TARGET_TAB:
            return { ...state, tab: action.tab };
        default:
            return state;
    }
}
