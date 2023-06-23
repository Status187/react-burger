import { SET_TARGET_TAB } from "../../action/actionTypes";
import { dataMockBun } from "../utils/dataMock";
import { initialState, tabReducer } from "./tabReducer";

describe("tabReducer", () => {
  it('Вернет начальное состояние', () => {
    expect(
      tabReducer(initialState, {
        type: "",
        tab: undefined
      })
      ).toEqual(initialState)
  });
  it('Должен верно обработать SET_TARGET_TAB', () => {
    expect(
      tabReducer(initialState, {
        type: SET_TARGET_TAB,
        tab: dataMockBun
      })
      ).toEqual({
        tab: dataMockBun
      })
  });
});