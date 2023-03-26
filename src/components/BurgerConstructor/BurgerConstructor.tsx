import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import { DrugAndDrop } from './components/DrugAndDrop/DrugAndDrop';
import { InfoAmount } from './components/InfoAmount/InfoAmount';
import { Modal } from '../Modal/Modal';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { TotalPriceContext } from '../../services/totalPriceContext';
import { dataReducer, OrderNumberContext } from '../../services/orderNumberContext';
import { DOWN, UP} from '../../ constants';
import { sendIngredients } from '../../utils/burger-api';
import { useSelector } from 'react-redux';
import { getIngredients } from '../../services/selectors';

export const BurgerConstructor = (): JSX.Element => {
  const { data } = useSelector(getIngredients);
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const initialData = {
    name: null,
    order: 0,
    success: false
  };

  const stateOfConstructor = [...data].slice(1, Infinity,);

  const handleClick = () => {
    const stateOfConstructorIds = stateOfConstructor.map((item) => item._id);
    stateOfConstructorIds.push(stateOfConstructor[0]._id);
      sendIngredients(stateOfConstructorIds, serverResponseDispatcher)
  };

  const totalPrice = React.useMemo(() => {
    return data.map((item: { type: string; price: any; }) => 
      item.type !== "bun" ? (item.price) : 0).reduce((a: number, b: number) => a + b,
        stateOfConstructor[0].price * 2)
  }, [data, stateOfConstructor])

  const [serverResponseData, serverResponseDispatcher] = React.useReducer(dataReducer, initialData, undefined);

  const openModal = () => {
    setIsOpenModal(true)
  };

  const closeModal = () => {
    setIsOpenModal(false)
  };

  const { bun, ingredients } = React.useMemo(() => {
    return {
      bun: data.find((item: { type: string; }) => item.type === 'bun'),
      ingredients: data.filter((item: { type: string; }) => item.type !== 'bun'),
    };
  }, [data]);

  const getChoice = (): JSX.Element[] => {
    return (
      ingredients.map((el: { _id: string; name: string; price: number; image: string; }) => (
        <div className={`${styles["item-wrapper"]}`} key={el._id + 'ingredients'}>
          <DrugAndDrop />
          <ConstructorElement
            isLocked={false}
            text={el.name}
            price={el.price}
            thumbnail={el.image}
            extraClass={`mr-1`}
          />
        </div>
    )))
  };

  const getChoiceBunTop = (): JSX.Element | undefined => {
    return bun && (
      <div className={`${styles["item-wrapper"]}`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} ${UP}`}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`ml-4 mr-4`}
        />
      </div>
    )
  };

  const getChoiceBunBottom = (): JSX.Element | undefined => {
    return bun && (
        <div className={`${styles["item-wrapper"]}`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} ${DOWN}`}
            price={bun.price}
            thumbnail={bun.image}
            extraClass={`ml-4 mr-4`}
          />
        </div>
    )
  };

  return (
    <section className={`${styles["constructor-wrapper"]}`}>
      {isOpenModal && <Modal onClose={closeModal}>
        <OrderNumberContext.Provider value={{serverResponseData}}>
          <OrderDetails />
        </OrderNumberContext.Provider>
        </Modal>}
      <div className={`${styles["constructor-wrapper"]} mt-25`}>
        {getChoiceBunTop()}
        <div className={`${styles["ingredients-wrapper"]} custom-scroll`}>{getChoice()}</div>
        {getChoiceBunBottom()}
        <TotalPriceContext.Provider value={{ totalPrice, handleClick }}>
          <InfoAmount onClick={openModal}/>
        </TotalPriceContext.Provider>
      </div>
    </section>
  )
};