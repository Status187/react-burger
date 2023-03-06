import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { data } from '../../utils/data';
import styles from './BurgerIngredients.module.css';
import { CardElement } from './components/cardElement/CardElement';

export const BurgerIngredients = ()=> {
  const [current, setCurrent] = React.useState('bun')
  return (
    <section className={`${styles["ingredients"]}`}>
      <h2 className={`${styles["ingredients-title"]} text_type_main-large mt-10 mb-5`}>Соберите бургер</h2>
      <div className={`${styles["ingredients-tabs"]} mb-10`}>
        <Tab value={'bun'} active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
        <Tab value={'sauce'} active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
        <Tab value={'fillings'} active={current === 'fillings'} onClick={setCurrent}>Начинки</Tab>
      </div>
      <CardElement data={data}/>
    </section>
  )
}