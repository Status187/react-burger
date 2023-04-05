import { request } from "../../utils/request";
import { AppDispatch } from "../store";

export const SET_ORDER_REQUEST = 'SET_ORDER_REQUEST';
export const SET_ORDER_SUCCESS = 'SET_ORDER_SUCCESS';
export const SET_ORDER_ERROR = 'SET_ORDER_ERROR';
export const SET_CLEAR_ORDER = 'SET_CLEAR_ORDER';

const orders = 'orders';

export const sendOrder = (ids: string[]) => (dispatch: AppDispatch) => {
  request(orders, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "ingredients": ids
    })
  })
  .then((json: any) => dispatch({type: SET_ORDER_SUCCESS, order: json}))
  .catch((error: any) => console.error(`"Что то пошло не так", ${error}`))
};
