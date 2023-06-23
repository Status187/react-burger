import { ALL_ORDERS_CLOSED, ALL_ORDERS_SUCCESS } from "../../action/allOrdersAction";
import { initialState } from "../utils/initialState";
import { allOrdersReducer } from "./allOrdersReducer";

describe("allOrdersReducer", () => {
  it('Вернет начальное состояние', () => {
    expect(
      allOrdersReducer(initialState, {
        type: "ALL_ORDERS_OPEN"
      })
    ).toEqual(initialState)
  });
  it('Должен верно обработать ALL_ORDERS_SUCCESS', () => {
    expect(
      allOrdersReducer(initialState, {
        type: ALL_ORDERS_SUCCESS
      })
    ).toEqual(expect.objectContaining({
      error: null,
      wsConnected: true
    }))
  });
  it('Должен верно обработать ALL_ORDERS_CLOSED', () => {
    expect(
      allOrdersReducer(initialState, {
        type: ALL_ORDERS_CLOSED
      })
    ).toEqual(expect.objectContaining({
      error: null,
      wsConnected: false
    }))
  });
});