import React, { useContext } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { IData, IDataState } from '../../types';
import styles from './BurgerConstructor.module.css';
import { DrugAndDrop } from './components/DrugAndDrop/DrugAndDrop';
import { InfoAmount } from './components/InfoAmount/InfoAmount';
import { Modal } from '../Modal/Modal';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { BurgerConstructorContext } from '../../services/appContext';
import { TotalPriceContext } from '../../services/totalPriceContext';

export const BurgerConstructor = () => {
  const { dataState } = useContext(BurgerConstructorContext);
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState({
    success: null,
    data: []
  });

  const initialState = [0];
  const stateOfConstructor = [...dataState.data].slice(1, Infinity);
  const stateOfConstructorIds = stateOfConstructor.map((item) => item._id);
  console.log(isLoading,data);

  const handleClick = () => {
    setIsLoading(true);
    const URL = "https://norma.nomoreparties.space/api/orders";

      fetch(URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "ingredients": stateOfConstructorIds
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(json => setData(json))
      .catch((error) => console.error(`"Что то пошло не так", ${error}`))
  };

  const reducer = (state: any, action: IDataState) => {
    switch (action.type) {
      case "set":
        return action.payload.data.map((item: { type: string; price: number; }) => item.type !== "bun" ? (item.price) : 0).reduce((a: number, b: number) => a + b, stateOfConstructor[0].price * 2)
      case "reset":
        return initialState
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  const [totalPriceState, totalPriceDispatcher] = React.useReducer(reducer, initialState, undefined);

  const openModal = () => {
    setIsOpenModal(true)
  };

  const closeModal = () => {
    setIsOpenModal(false)
  };

  const UP = '(верх)';
  const DOWN = '(низ)';

  React.useEffect(() => {
    totalPriceDispatcher({type: 'set', payload: dataState});
  },[dataState]);

  const getChoice = (dataState: { data: IData[]; }) => {
    return (
      dataState.data.map((el) => (
        el.type !== "bun" && (
        <div className={`${styles["item-wrapper"]}`} key={el._id + 'ingredients'}>
          <DrugAndDrop />
          <ConstructorElement
            isLocked={false}
            text={el.name}
            price={el.price}
            thumbnail={el.image}
            extraClass={`mr-1`}
          />
        </div>)
    )))
  };

  const getChoiceBunTop = (dataState: IData[]) => {
    return (
      dataState.map((el) => (
        el.type === "bun" && (
        <div className={`${styles["item-wrapper"]}`} key={el._id + 'ingredients'}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${el.name} ${UP}`}
            price={el.price}
            thumbnail={el.image}
            extraClass={`ml-4 mr-4`}
          />
        </div>)
    )))
  };

  const getChoiceBunBottom = (dataState: IData[]) => {
    return (
      dataState.map((el) => (
        el.type === "bun" && (
        <div className={`${styles["item-wrapper"]}`} key={el._id + 'ingredients'}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${el.name} ${DOWN}`}
            price={el.price}
            thumbnail={el.image}
            extraClass={`ml-4 mr-4`}
          />
        </div>)
    )))
  };

  return (
    <section className={`${styles["constructor-wrapper"]}`}>
      {isOpenModal && <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>}
      <div className={`${styles["constructor-wrapper"]} mt-25`}>
        {getChoiceBunTop(stateOfConstructor)}
        <div className={`${styles["ingredients-wrapper"]} custom-scroll`}>{getChoice(dataState)}</div>
        {getChoiceBunBottom(stateOfConstructor)}
        <TotalPriceContext.Provider value={{ totalPriceState, totalPriceDispatcher, handleClick }}>
          <InfoAmount onClick={openModal}/>
        </TotalPriceContext.Provider>
      </div>
    </section>
  )
};