import { URL_MAIN as URL } from "../../constants";
import { IData } from "../../types";
import { SAVE_INGREDIENTS } from "./actionTypes";

const saveIngredients = (list: IData[]) => {
  return {
    type: SAVE_INGREDIENTS,
    list,
  }
}

export const loadIngredients = (dispatch: (arg0: { type: string; list: IData[]; }) => any, getState: any) => {
  // todo state loading
  
  fetch(URL)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then(json => dispatch(saveIngredients(json)))
    .catch((error) => console.error(`"Что то пошло не так", ${error}`))
}