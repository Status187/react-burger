import { SET_CLEAR_ORDER, SET_ORDER_ERROR, SET_ORDER_REQUEST, SET_ORDER_SUCCESS } from "../../action/orderNumberAction";
import { initialState, orderNumberReducer } from "./orderNumberReducer";

describe("orderNumberReducer", () => {
  it('Вернет начальное состояние', () => {
    expect(orderNumberReducer(initialState, {
      type: "",
      order: undefined
    } )).toEqual(expect.objectContaining({
      loading: false,
      isErrors: false,
      order: null
    }))
  });
  it('Должен верно обработать SET_ORDER_REQUEST', () => {
    expect(orderNumberReducer(initialState, {
      type: SET_ORDER_REQUEST,
      order: undefined
    } )).toEqual(expect.objectContaining({
      loading: true,
      isErrors: false,
      order: null
    }))
  });
  it('Должен верно обработать SET_ORDER_SUCCESS', () => {
    expect(orderNumberReducer(initialState, {
      type: SET_ORDER_SUCCESS,
      order: 2
    } )).toEqual(expect.objectContaining({
      loading: false,
      isErrors: false,
      order: 2
    }))
  });
  it('Должен верно обработать SET_ORDER_ERROR', () => {
    expect(orderNumberReducer(initialState, {
      type: SET_ORDER_ERROR,
      order: false
    } )).toEqual(expect.objectContaining({
      loading: false,
      isErrors: true,
      order: false
    }))
  });
  it('Должен верно обработать SET_CLEAR_ORDER', () => {
    expect(orderNumberReducer(initialState, {
      type: SET_CLEAR_ORDER,
      order: false
    } )).toEqual(expect.objectContaining({
      loading: false,
      isErrors: false,
      order: null
    }))
  });
});