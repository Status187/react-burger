import React, { useContext } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { IData, IDataReduce, IDataState } from '../../types';
import styles from './BurgerConstructor.module.css';
import { DrugAndDrop } from './components/DrugAndDrop/DrugAndDrop';
import { InfoAmount } from './components/InfoAmount/InfoAmount';
import { Modal } from '../Modal/Modal';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { BurgerConstructorContext } from '../../services/appContext';
import { TotalPriceContext } from '../../services/totalPriceContext';
import { OrderNumberContext } from '../../services/orderNumberContext';

export const BurgerConstructor = (): JSX.Element => {
  const { dataState } = useContext(BurgerConstructorContext);
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const initialState = [0];
  const initialData = {
    name: null,
    order: 0,
    success: false
  };

  const stateOfConstructor = [...dataState.data].slice(1, Infinity);
  const stateOfConstructorIds = stateOfConstructor.map((item) => item._id);

  const handleClick = () => {
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
      .then(json => serverResponseDispatcher({type: 'set', payload: json}))
      .catch((error) => console.error(`"Что то пошло не так", ${error}`))
  };

  const reducer = (state: any, action: IDataState) => {
    switch (action.type) {
      case "set":
        return action.payload.data.map((item: { type: string; price: number; }) => 
        item.type !== "bun" ? (item.price) : 0).reduce((a: number, b: number) => a + b,
         stateOfConstructor[0].price * 2)
      case "reset":
        return initialState
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }
  
  const dataReducer = (state: any, action: IDataReduce ) => {
    switch (action.type) {
      case "set":
        return { success: action.payload.success, name: action.payload.name, order: action.payload.order }
      case "reset":
        return initialData
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  const [totalPriceState, totalPriceDispatcher] = React.useReducer(reducer, initialState, undefined);

  const [serverResponseData, serverResponseDispatcher] = React.useReducer(dataReducer, initialData, undefined);

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

  const getChoice = (dataState: { data: IData[]; }): (false | JSX.Element)[] => {
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

  const getChoiceBunTop = (dataState: IData[]): (false | JSX.Element)[] => {
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

  const getChoiceBunBottom = (dataState: IData[]): (false | JSX.Element)[] => {
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
        <OrderNumberContext.Provider value={{serverResponseData}}>
          <OrderDetails />
        </OrderNumberContext.Provider>
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