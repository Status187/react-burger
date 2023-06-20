import { ORDER_ERROR, ORDER_START, ORDER_SUCCESS } from "../../action/orderAction";
import { getOrderReducer, initialState } from "./orderReducer";

describe("getOrderReducer", () => {
  it('Должен верно обработать ORDER_START', () => {
    expect(getOrderReducer(initialState, {
      type: ORDER_START
    } )).toEqual({
      requestStart: true,
      requestError: null,
      order: null
    })
  });
  it('Должен верно обработать ORDER_SUCCESS', () => {
    expect(getOrderReducer(initialState, {
      type: ORDER_SUCCESS,
      order: {
        ingredients: [],
        _id: 'd2',
        status: '',
        name: '',
        number: 0,
        createdAt: '',
        updatedAt: '',
      }
    } )).toEqual({
      requestStart: false,
      requestError: null,
      order: {
        ingredients: [],
        _id: 'd2',
        status: '',
        name: '',
        number: 0,
        createdAt: '',
        updatedAt: '',
      }
    })
  });
  it('Должен верно обработать ORDER_ERROR', () => {
    expect(getOrderReducer(initialState, {
      type: ORDER_ERROR,
      message: 'error'
    } )).toEqual({
      requestStart: false,
      requestError: 'error',
      order: null
    })
  });
});