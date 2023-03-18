import React from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './InfoAmount.module.css';
import { TotalPriceContext } from '../../../../services/totalPriceContext';
import { IInfoAmount } from '../../../../types';

export const InfoAmount = ({
  onClick = () => {}
}: IInfoAmount): JSX.Element => {
  const { totalPrice, handleClick } = React.useContext(TotalPriceContext);

  return (
      <div className={`${styles["info-amount"]} mt-10 mr-4`} onClick={onClick}>
        <div className={`${styles["info-wrapper"]} mr-10`}>
          <span className={`${styles["amount"]} text_type_digits-medium`}>{totalPrice}</span>
          <CurrencyIcon type="primary"/>
        </div>
        <Button htmlType='button' size='large' onClick={handleClick}>Оформить заказ</Button>
      </div>
  )
}