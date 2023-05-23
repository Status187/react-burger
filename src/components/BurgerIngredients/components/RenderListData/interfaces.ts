import { IData } from "../../../../types";

export interface IRendarListData {
  categoryTypesElement: string;
  el: IData;
  openModal: () => void;
}

export interface IStateIds {
  [name: string]: number;
}