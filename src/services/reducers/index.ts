import { combineReducers } from "redux";
import { allIngredientsReducer } from "./allIngredientsReducer";
import { constructorReducer } from "./constructorReducer";
import { orderNumberReducer } from "./orderNumberReducer";
import { tabReducer } from "./tabReducer";
import { authReducer } from "./authReducer";
import { resetPasswordReducer } from "./resetPasswordReducer";
import { allOrdersReducer } from "./allOrdersReducer";
import { ordersUserReducer } from "./userOrdersReducer";
import { getOrderReducer } from "./orderReducer";

export default combineReducers({
  tabItems: tabReducer,
  ingredients: allIngredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderNumberReducer,
  auth: authReducer,
  resetPassword: resetPasswordReducer,
  allOrders: allOrdersReducer,
  userOrders: ordersUserReducer,
  getOrder: getOrderReducer
});