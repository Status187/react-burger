import { URL_FOR_ORDER as URL } from '../constants'

export function sendIngredients(state, serverResponseDispatcher) {
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "ingredients": state
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  })
  .then(json => serverResponseDispatcher({type: 'set', payload: json}))
  .catch((error) => console.error(`"Что то пошло не так", ${error}`))
}