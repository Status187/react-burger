import { request } from "../../utils/request";

export const SET_ORDER_REQUEST = 'SET_ORDER_REQUEST';
export const SET_ORDER_SUCCESS = 'SET_ORDER_SUCCESS';
export const SET_ORDER_ERROR = 'SET_ORDER_ERROR';
export const SET_CLEAR_ORDER = 'SET_CLEAR_ORDER';

const orders = 'orders';

export const sendIngredients = (state: any) => (orderNumberReducer: (arg0: { type: string; order: any; }) => any) => {
  request(orders, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "ingredients": state
    })
  })
  .then((json: any) => orderNumberReducer({type: SET_ORDER_SUCCESS, order: json}))
  .catch((error: any) => console.error(`"Что то пошло не так", ${error}`))
};
