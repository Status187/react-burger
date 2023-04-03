import * as React from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './InfoAmount.module.css';
import { IInfoAmount } from '../../../../types';
import { getSelectedBuns, getSelectedIngredients, getTotalAmount } from '../../../../services/selectors';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../services/store';
import { sendIngredients } from '../../../../services/action/orderNumberAction';

export const InfoAmount = ({
  onClick = () => {}
}: IInfoAmount): JSX.Element => {

  const bun = useSelector(getSelectedBuns);
  const ingredients = useSelector(getSelectedIngredients);
  const dispatch = useAppDispatch();

  const getAllOrderId = () => {
      const allIngredientsId = ingredients && ingredients.map((el) => el._id)
      const bansId = bun && [bun._id];
      const ids = bansId.concat(allIngredientsId)
      const plusBun = ids.concat(bansId)
      dispatch(sendIngredients(plusBun))
    return plusBun;
  }

  const disabled = React.useMemo(() => {
    let haveIngredients = (ingredients && ingredients.length > 0) && bun;
    
    return !haveIngredients;
  }, [bun, ingredients]);

  const onHandleClick = () => {
    getAllOrderId();
    onClick();
  }

  const totalAmount = useSelector(getTotalAmount)

  return (
      <div className={`${styles["info-amount"]} mt-10 mr-4`}>
        <div className={`${styles["info-wrapper"]} mr-10`}>
          <span className={`${styles["amount"]} text_type_digits-medium`}>{totalAmount}</span>
          <CurrencyIcon type="primary"/>
        </div>
        <Button htmlType='button' size='large' disabled={disabled} onClick={onHandleClick}>Оформить заказ</Button>
      </div>
  )
}