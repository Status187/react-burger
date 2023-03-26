import { combineReducers } from "redux";
import { allIngredientsReducer } from "./allIngredientsReducer";
import { constructorReducer } from "./constructorReducer";
import { tabReducer } from "./tabReducer";

export default combineReducers({
  tabItems: tabReducer,
  ingredients: allIngredientsReducer,
  burgerConstructor: constructorReducer,
});