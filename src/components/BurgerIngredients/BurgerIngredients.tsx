import * as React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import { CardElement } from './components/IIngredientList/IngredientList';
import { IData } from '../../types';
import { BUN, FILLINGS, SAUCE } from '../../ constants';
import { useDispatch, useSelector } from 'react-redux';
import { SET_TARGET_TAB } from '../../services/action/tabAction';
import { getTargetTab } from '../../services/selectors';

export const BurgerIngredients = (props: { data: IData[]; }): JSX.Element => {

  const dispatch = useDispatch();
  const tabCurrent = useSelector(getTargetTab);

  const handleChoice = (type: any) => {
    dispatch({ type: SET_TARGET_TAB, tab: type})
  };

  const bunsRef = React.useRef<HTMLDivElement>(null);
  const soucesRef = React.useRef<HTMLDivElement>(null);
  const fillingsRef = React.useRef<HTMLDivElement>(null);

  return (
    <section className={`${styles["ingredients"]}`}>
      <h2 className={`${styles["ingredients-title"]} text_type_main-large mt-10 mb-5`}>Соберите бургер</h2>
      <div className={`${styles["ingredients-tabs"]} mb-10`}>
        <Tab value={BUN} active={tabCurrent === 'bun'} onClick={(value) => {handleChoice(value); bunsRef.current !== null && bunsRef.current.scrollIntoView({ behavior: "smooth", })}}>Булки</Tab>
        <Tab value={SAUCE} active={tabCurrent === 'sauce'} onClick={(value) => {handleChoice(value); soucesRef.current !== null && soucesRef.current.scrollIntoView({ behavior: "smooth", })}}>Соусы</Tab>
        <Tab value={FILLINGS} active={tabCurrent === 'fillings'} onClick={(value) => {handleChoice(value); fillingsRef.current !== null && fillingsRef.current?.scrollIntoView({ behavior: "smooth", })}}>Начинки</Tab>
      </div>
      <CardElement data={props.data} bunsRef={bunsRef} soucesRef={soucesRef} fillingsRef={fillingsRef}/>
    </section>
  )
};
