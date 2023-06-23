import * as React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import { IngredientList } from './components/IngredientList/IngredientList';
import { BUN, FILLINGS, SAUCE } from '../../constants';
import { SET_TARGET_TAB } from '../../services/action/actionTypes';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getTargetTab } from '../../services/selectors';

export const BurgerIngredients = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const tabCurrent = useAppSelector(getTargetTab);

  const handleChoice = (type: string) => {
    dispatch({ type: SET_TARGET_TAB, tab: type})
  };

  const bunsRef = React.useRef<HTMLDivElement>(null);
  const soucesRef = React.useRef<HTMLDivElement>(null);
  const fillingsRef = React.useRef<HTMLDivElement>(null);

  return (
    <section className={`${styles["ingredients"]}`}>
      <h2 className={`${styles["ingredients-title"]} text_type_main-large mt-10 mb-5`}>Соберите бургер</h2>
      <div className={`${styles["ingredients-tabs"]} mb-10`}>
        <Tab data-testid="tab-bun" value={BUN} active={tabCurrent === 'bun'} onClick={(value) => {handleChoice(value); bunsRef.current !== null && bunsRef.current.scrollIntoView({ behavior: "smooth", })}}>Булки</Tab>
        <Tab data-testid="tab-sauce" value={SAUCE} active={tabCurrent === 'sauce'} onClick={(value) => {handleChoice(value); soucesRef.current !== null && soucesRef.current.scrollIntoView({ behavior: "smooth", })}}>Соусы</Tab>
        <Tab data-testid="tab-fillings" value={FILLINGS} active={tabCurrent === 'fillings'} onClick={(value) => {handleChoice(value); fillingsRef.current !== null && fillingsRef.current?.scrollIntoView({ behavior: "smooth", })}}>Начинки</Tab>
      </div>
      <IngredientList bunsRef={bunsRef} soucesRef={soucesRef} fillingsRef={fillingsRef}/>
    </section>
  )
};
