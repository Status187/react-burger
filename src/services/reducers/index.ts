import { combineReducers } from "redux";
import { tabReducer } from "./tabReducer";

export default combineReducers({
  tabItems: tabReducer
});