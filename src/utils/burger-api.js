import { SET_ORDER_SUCCESS } from '../services/action/orderNumberAction';
import { request } from '../utils/request';

const orders = 'orders';

export const sendIngredients = (state) => (orderNumberReducer) => {
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
  .then(json => orderNumberReducer({type: SET_ORDER_SUCCESS, order: json}))
  .catch((error) => console.error(`"Что то пошло не так", ${error}`))
};
