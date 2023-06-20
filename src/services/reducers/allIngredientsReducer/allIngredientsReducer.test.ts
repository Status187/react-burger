
import { SAVE_INGREDIENTS, SET_ACTIVE } from "../../action/actionTypes";
import { dataMock, dataMockBun } from "../utils/dataMock";
import { allIngredientsReducer, initialState } from "./allIngredientsReducer";

describe("allIngredientsReducer", () => {
  it('Вернет начальное состояние', () => {
    expect(allIngredientsReducer(initialState, {
      type: "",
      list: undefined,
      item: undefined
    } )).toEqual(initialState)
  })
  it('Должен верно обработать SAVE_INGREDIENTS', () => {
    expect(allIngredientsReducer(initialState, {
      type: SAVE_INGREDIENTS,
      list: dataMock,
      item: null
    } )).toEqual({
      list: dataMock,
      currentActive: null
    })
  })
  // it('Должен верно обработать SET_ACTIVE', () => {
  //   expect(allIngredientsReducer(initialState, {
  //     type: SET_ACTIVE,
  //     list: dataMock,
  //     item: dataMockIngredient
  //   } )).toEqual({
  //     list: dataMock,
  //     currentActive: dataMockIngredient
  //   })
  // })
});