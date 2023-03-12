import React from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './InfoAmount.module.css';

export const InfoAmount = ({
  onClick = () => {}
})=> {

  return (
    <div className={`${styles["info-amount"]} mt-10 mr-4`} onClick={() => onClick()}>
      <div className={`${styles["info-wrapper"]} mr-10`}>
        <span className={`${styles["amount"]} text_type_digits-medium`}>2590</span>
        <CurrencyIcon type="primary"/>
      </div>
      <Button htmlType={'button'} size='large'>Оформить заказ</Button>
    </div>
  )
}