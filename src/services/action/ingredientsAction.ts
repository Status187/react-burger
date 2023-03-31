import { IData } from "../../types";
import { request } from "../../utils/request";
import { AppDispatch } from "../store";
import { SAVE_INGREDIENTS } from "./actionTypes";

const saveIngredients = (list: IData[]) => {
  return {
    type: SAVE_INGREDIENTS,
    list,
  }
}

const ingredients = 'ingredients';

export const loadIngredients = () => (dispatch: AppDispatch) => {
  // todo state loading
  
    request(ingredients)
    .then(json => dispatch(saveIngredients(json)))
    .catch((error) => console.error(`"Что то пошло не так", ${error}`))
}