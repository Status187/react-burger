import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import { CardElement } from './components/IIngredientList/IngredientList';
import { IData } from '../../types';

export const BurgerIngredients = (props: { data: IData[]; }) => {
  const [current, setCurrent] = React.useState('bun')
  return (
    <section className={`${styles["ingredients"]}`}>
      <h2 className={`${styles["ingredients-title"]} text_type_main-large mt-10 mb-5`}>Соберите бургер</h2>
      <div className={`${styles["ingredients-tabs"]} mb-10`}>
        <Tab value={'bun'} active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
        <Tab value={'sauce'} active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
        <Tab value={'fillings'} active={current === 'fillings'} onClick={setCurrent}>Начинки</Tab>
      </div>
      <CardElement data={props.data}/>
    </section>
  )
}