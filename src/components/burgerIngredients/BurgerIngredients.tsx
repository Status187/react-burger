import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { data } from '../../utils/data';
import styles from './BurgerIngredients.module.css';
import { CardElement } from './components/cardElement';

export const BurgerIngredients = ()=> {
  return (
    <section className={`${styles["ingredients"]}`}>
      <h2 className={`${styles["ingredients-title"]} text_type_main-large mt-10 mb-5`}>Соберите бургер</h2>
      <div className={`${styles["ingredients-tabs"]} mb-10`}>
        <Tab value={'Булки'} active={false} onClick={() => {}}>Булки</Tab>
        <Tab value={'Соусы'} active={false} onClick={() => {}}>Соусы</Tab>
        <Tab value={'Начинки'} active={false} onClick={() => {}}>Начинки</Tab>
      </div>
      <CardElement data={data}/>
    </section>
  )
}