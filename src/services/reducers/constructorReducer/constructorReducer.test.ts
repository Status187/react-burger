import { IData } from "../../../types";
import { ADD_INGREDIENTS, DELETE_INGREDIENT, SET_AMOUNT, SET_BUNS, SET_CLEAR_CONSTRUCTOR } from "../../action/actionTypes";
import { dataMockBun, dataMockIngredient } from "../utils/dataMock";
import { constructorReducer, initialState } from "./constructorReducer"

describe("constructorReducer", () => {
  it('Вернет начальное состояние', () => {
    expect(constructorReducer(initialState, {
      amount: 0,
      bun: undefined,
      type: undefined,
      ingredient: dataMockBun,
      index: 0,
      indexCurrent: 0,
      indexNext: 2
    } )).toEqual(expect.objectContaining({
      bun: null,
      ingredients: [] as IData[],
      amount: 0
    }))
  });
  it('Должен верно обработать SET_BUNS', () => {
    expect(constructorReducer(initialState, {
      amount: 0,
      bun: dataMockBun,
      type: SET_BUNS,
      ingredient: dataMockBun,
      index: 0,
      indexNext: 2,
      indexCurrent: 0
    } )).toEqual(expect.objectContaining({
      bun: dataMockBun
    }))
  });
  it('Должен верно обработать ADD_INGREDIENTS', () => {
    expect(constructorReducer(initialState, {
      amount: 0,
      bun: dataMockBun,
      type: ADD_INGREDIENTS,
      ingredient: dataMockIngredient,
      index: 0,
      indexNext: 2,
      indexCurrent: 0
    } )).toEqual({
      amount: 0,
      bun: null,
      ingredients: [dataMockIngredient]
    })
  });
  it('Должен верно обработать DELETE_INGREDIENT', () => {
    expect(constructorReducer(initialState, {
      amount: 0,
      bun: dataMockBun,
      type: DELETE_INGREDIENT,
      ingredient: dataMockIngredient,
      index: 0,
      indexNext: 2,
      indexCurrent: 0
    } )).toEqual({
      amount: 0,
      bun: null,
      ingredients: []
    })
  });
  it('Должен верно обработать SET_AMOUNT', () => {
    expect(constructorReducer(initialState, {
      amount: 3,
      bun: dataMockBun,
      type: SET_AMOUNT,
      ingredient: dataMockIngredient,
      index: 0,
      indexNext: 2,
      indexCurrent: 0
    } )).toEqual({
      amount: 3,
      bun: null,
      ingredients: []
    })
  });
  it('Должен верно обработать SET_CLEAR_CONSTRUCTOR', () => {
    expect(constructorReducer(initialState, {
      amount: 0,
      bun: dataMockBun,
      type: SET_CLEAR_CONSTRUCTOR,
      ingredient: dataMockIngredient,
      index: 0,
      indexNext: 2,
      indexCurrent: 0
    } )).toEqual({
      amount: 0,
      bun: null,
      ingredients: []
    })
  });
});