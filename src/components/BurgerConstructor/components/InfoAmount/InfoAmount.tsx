import React from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './InfoAmount.module.css';
import { IInfoAmount } from '../../../../types';
import { getSelectedBuns, getSelectedIngredients, getTotalAmount } from '../../../../services/selectors';
import { useSelector } from 'react-redux';

export const InfoAmount = ({
  onClick = () => {}
}: IInfoAmount): JSX.Element => {

  const bun = useSelector(getSelectedBuns);
  const ingredients = useSelector(getSelectedIngredients);

  const getAllOrderId = () => {
      const allIngredientsId = ingredients && ingredients.map((el) => el._id)
      const bansId = bun && [bun._id];
      const ids = bansId.concat(allIngredientsId)
      const plusBun = ids.concat(bansId)
    return plusBun;
  }

  const totalAmount = useSelector(getTotalAmount)

  return (
      <div className={`${styles["info-amount"]} mt-10 mr-4`} onClick={onClick}>
        <div className={`${styles["info-wrapper"]} mr-10`}>
          <span className={`${styles["amount"]} text_type_digits-medium`}>{totalAmount}</span>
          <CurrencyIcon type="primary"/>
        </div>
        <Button htmlType='button' size='large' onClick={() => {getAllOrderId()}}>Оформить заказ</Button>
      </div>
  )
}