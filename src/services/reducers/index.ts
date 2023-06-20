import { combineReducers } from "redux";
import { allIngredientsReducer } from "./allIngredientsReducer/allIngredientsReducer";
import { constructorReducer } from "./constructorReducer/constructorReducer";
import { orderNumberReducer } from "./orderNumberReducer/orderNumberReducer";
import { tabReducer } from "./tabReducer/tabReducer";
import { authReducer } from "./authReducer/authReducer";
import { resetPasswordReducer } from "./resetPasswordReducer/resetPasswordReducer";
import { allOrdersReducer } from "./allOrdersReducer/allOrdersReducer";
import { ordersUserReducer } from "./userOrdersReducer/userOrdersReducer";
import { getOrderReducer } from "./orderReducer/orderReducer";

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