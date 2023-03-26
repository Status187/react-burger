import React, { useRef } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import { DrugAndDrop } from './components/DrugAndDrop/DrugAndDrop';
import { InfoAmount } from './components/InfoAmount/InfoAmount';
import { Modal } from '../Modal/Modal';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { BUNS_TEXT, DOWN, INGREDIENTS_TEXT, UP} from '../../constants';
import { useSelector } from 'react-redux';
import { getIngredients } from '../../services/selectors';

export const BurgerConstructor = (): JSX.Element => {
  const { data } = useSelector(getIngredients);
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const ref = useRef(null);

  // const stateOfConstructor = [...data].slice(1, Infinity,);

  const handleClick = () => {
    // const stateOfConstructorIds = stateOfConstructor.map((item) => item._id);
    // stateOfConstructorIds.push(stateOfConstructor[0]._id);
    //   sendIngredients(stateOfConstructorIds, serverResponseDispatcher)
  };

  // const totalPrice = React.useMemo(() => {
  //   return data.map((item: { type: string; price: any; }) => 
  //     item.type !== "bun" ? (item.price) : 0).reduce((a: number, b: number) => a + b,
  //       stateOfConstructor[0].price * 2)
  // }, [data, stateOfConstructor])

  // const [serverResponseData, serverResponseDispatcher] = React.useReducer(dataReducer, initialData, undefined);

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
        <div className={`${styles["item-wrapper"]}`} key={el._id + 'ingredients'} ref={ref}>
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

  const StubOfIngredients = () => {
    return (
      <div className={`${styles["stub-wrapper-ingredients"]} mr-4 ml-4`}>{INGREDIENTS_TEXT}</div>
    )
  }

  const StubOfBunsTop = (): JSX.Element => {
    return <div className={`${styles["stub-wrapper-buns-top"]} top mr-4 ml-4`}>{BUNS_TEXT}</div>
  }

  const StubOfBunsBottom = (): JSX.Element => {
    return <div className={`${styles["stub-wrapper-buns-bottom"]} top mr-4 ml-4`}>{BUNS_TEXT}</div>
  }

  return (
    <section className={`${styles["constructor-wrapper"]}`}>
      {isOpenModal && <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>}
      <div className={`${styles["constructor-wrapper"]} mt-25`}>
        {/* {getChoiceBunTop()} */}
        <StubOfBunsTop/>
        <div className={`${styles["ingredients-wrapper"]} custom-scroll`}>
          <StubOfIngredients/>
          {/* {getChoice()} */}
        </div>
        <StubOfBunsBottom/>
        {/* {getChoiceBunBottom()} */}
          <InfoAmount onClick={openModal}/>
      </div>
    </section>
  )
};