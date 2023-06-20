import { USER_ORDERS_CLOSED, USER_ORDERS_ERROR, USER_ORDERS_MESSAGE, USER_ORDERS_SUCCESS } from "../../action/userOrdersAction";
import { initialState } from "../utils/initialState";
import { ordersUserReducer } from "./userOrdersReducer";

describe("ordersUserReducer", () => {
  it('Вернет начальное состояние', () => {
    expect(
      ordersUserReducer(initialState, {
        type: "USER_ORDERS_START",
        url: 'https://norma.nomoreparties.space/api/',
        addToken: false
      })
      ).toEqual(initialState)
  });
  it('Должен верно обработать SET_TARGET_TAB', () => {
    expect(
      ordersUserReducer(initialState, {
        type: USER_ORDERS_SUCCESS
      })
      ).toEqual({
        error: null,
        message: null,
        wsConnected: true
      })
  });
  it('Должен верно обработать USER_ORDERS_ERROR', () => {
    expect(
      ordersUserReducer(initialState, {
        type: USER_ORDERS_ERROR,
        error: 'error'
      })
      ).toEqual({
        error: "error",
        message: null,
        wsConnected: false
      })
  });
  it('Должен верно обработать USER_ORDERS_CLOSED', () => {
    expect(
      ordersUserReducer(initialState, {
        type: USER_ORDERS_CLOSED
      })
      ).toEqual({
        error: null,
        message: null,
        wsConnected: false
      })
  });
  it('Должен верно обработать USER_ORDERS_MESSAGE', () => {
    expect(
      ordersUserReducer(initialState, {
        type: USER_ORDERS_MESSAGE,
        message: {
          orders: [],
          total: 0,
          totalToday: 0,
        }
      })
      ).toEqual({
        error: null,
        message: {
          orders: [],
          total: 0,
          totalToday: 0,
        },
        wsConnected: false
      })
  });
});