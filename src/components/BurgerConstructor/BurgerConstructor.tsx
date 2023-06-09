import * as React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import { InfoAmount } from './components/InfoAmount/InfoAmount';
import { Modal } from '../Modal/Modal';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { BUN, BUNS_TEXT, DOWN, INGREDIENTS_TEXT, MAIN, SAUCE, UP} from '../../constants';
import { getSelectedBuns, getSelectedIngredients } from '../../services/selectors';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { DELETE_INGREDIENT, SET_AMOUNT, SET_BUNS, SET_CLEAR_CONSTRUCTOR } from '../../services/action/actionTypes';
import { useDrop } from 'react-dnd';
import { IngredientsChoice } from './components/IngredientsChoice/IngredientsChoice';
import { SET_CLEAR_ORDER } from '../../services/action/orderNumberAction';
import { addToConstructor } from '../../services/action/constructor';
import { IData } from '../../types';

export const BurgerConstructor = (): JSX.Element => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const ingredients = useAppSelector(getSelectedIngredients);
  const bun = useAppSelector(getSelectedBuns);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    let amount = 0;
    if (bun) {
      amount += bun.price * 2
    }
    amount += ingredients.reduce((total, item) => total += item.price, 0);
    dispatch({ type: SET_AMOUNT, amount })
  }, [bun, dispatch, ingredients]);

  const [, refDropBunUp] = useDrop({
    accept: BUN,
    drop(bun) {
      dispatch({ type: SET_BUNS, bun: bun });
    }
  });

  const [, refDropBunDown] = useDrop({
    accept: BUN,
    drop(bun) {
      dispatch({ type: SET_BUNS, bun: bun });
    }
  });

  const [, refDropIngredients] = useDrop({
    accept: [SAUCE, MAIN],
    drop(ingredient: IData) {
      dispatch(addToConstructor(ingredient));
    }
  });

  function deleteIngredient(index: number) {
    dispatch({ type: DELETE_INGREDIENT, index: index })
  };

  const openModal = () => {
    setIsOpenModal(true)
  };

  const closeModal = () => {
    setIsOpenModal(false);
    dispatch({type: SET_CLEAR_ORDER});
    dispatch({type: SET_CLEAR_CONSTRUCTOR});
  };

  const getChoiceIngredients = (): JSX.Element[] => {
    return (
      ingredients.map((el, index: number) => (
        <IngredientsChoice el={el} key={el.uuid} index={index} onDelete={() => deleteIngredient(index)}/>
    )))
  };

  const getChoiceBunTop = (): JSX.Element => {
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

  const getChoiceBunBottom = (): JSX.Element => {
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
  };

  const StubOfBunsTop = (): JSX.Element => {
    return <div className={`${styles["stub-wrapper-buns-top"]} top mr-4 ml-4`}>{BUNS_TEXT}</div>
  };

  const StubOfBunsBottom = (): JSX.Element => {
    return <div className={`${styles["stub-wrapper-buns-bottom"]} top mr-4 ml-4`}>{BUNS_TEXT}</div>
  };

  return (
    <section className={`${styles["constructor-wrapper"]}`}>
      
      {isOpenModal && <Modal onClose={closeModal}>
        <OrderDetails />
      </Modal>}

      <div className={`${styles["constructor-wrapper"]} mt-25`}>

        <div ref={refDropBunUp}>
          { bun ? (getChoiceBunTop()) : (<StubOfBunsTop/>)}
        </div>

        <div className={`${styles["ingredients-wrapper"]} custom-scroll`} ref={refDropIngredients}>
          { ingredients.length > 0 ? (getChoiceIngredients()) : (<StubOfIngredients/>)}
        </div>

        <div ref={refDropBunDown}>
        { bun ? (getChoiceBunBottom()) : (<StubOfBunsBottom/>)}
        </div>

        <InfoAmount onClick={openModal}/>
      </div>
    </section>
  )
};