import * as React from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './InfoAmount.module.css';
import { IInfoAmount, IInitialStateAuth } from '../../../../types';
import { getAuth, getSelectedBuns, getSelectedIngredients, getTotalAmount } from '../../../../services/selectors';
import { useAppDispatch, useAppSelector } from '../../../../services/store';
import { sendOrder } from '../../../../services/action/orderNumberAction';
import { useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE_URL } from '../../../../constants';

export const InfoAmount = ({
  onClick = () => {}
}: IInfoAmount): JSX.Element => {

  const bun = useAppSelector(getSelectedBuns);
  const ingredients = useAppSelector(getSelectedIngredients);
  const { user }: IInitialStateAuth = useAppSelector(getAuth);
  const totalAmount = useAppSelector(getTotalAmount)
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const getAllOrderId = () => {
    const allIngredientsId = ingredients && ingredients.map((el) => el._id)
    const bansId = bun && [bun._id];
    const ids = bansId.concat(allIngredientsId)
    const plusBun = ids.concat(bansId)
    dispatch(sendOrder(plusBun))
    return plusBun;
  }

  const disabled = React.useMemo(() => {
    let haveIngredients = (ingredients && ingredients.length > 0) && bun;
    
    return !haveIngredients;
  }, [bun, ingredients]);

  const onHandleClick = () => {
    if (user.email.length > 0) {
      getAllOrderId();
      onClick();
    } else {
      navigate(LOGIN_ROUTE_URL, { replace: true, state: { from: location } });
    }
  }

  return (
      <div className={`${styles["info-amount"]} mt-10 mr-4`}>
        <div className={`${styles["info-wrapper"]} mr-10`}>
          <span className={`${styles["amount"]} text_type_digits-medium`}>{totalAmount}</span>
          <CurrencyIcon type="primary"/>
        </div>
        <Button data-testid="place-an-order" htmlType='button' size='large' disabled={disabled} onClick={onHandleClick}>Оформить заказ</Button>
      </div>
  )
}