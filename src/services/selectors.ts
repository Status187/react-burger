import { RootState } from "./store";

export const getTargetTab = (state: RootState) => state.tabItems.tab;

export const getIngredients = (state: RootState) => state.ingredients.list;

export const getActiveIngredient = (state: RootState) => state.ingredients.currentActive;

export const getSelectedIngredients = (state: RootState) => state.burgerConstructor.ingredients;

export const getSelectedBuns = (state: RootState) => state.burgerConstructor.bun;

export const getTotalAmount = (state: RootState) => state.burgerConstructor.amount;

export const getOrder = (state: RootState) => state.order;

export const getAuth = (state: RootState) => state.auth;

export const getResetPassword = (state: RootState) => state.resetPassword;

export const getAllOrders = (state: RootState) => state.allOrders;

export const getUserOrders = (state: RootState) => state.userOrders;