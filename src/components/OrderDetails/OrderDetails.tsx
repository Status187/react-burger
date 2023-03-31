import React from 'react';
import styles from './OrderDetails.module.css';
import graphics from '../../graphics.png';
import { useSelector } from 'react-redux';
import { getOrder } from '../../services/selectors';

export const OrderDetails = (): JSX.Element => {

  const { order } = useSelector(getOrder)

  return (
    <div className={`${styles["modal-order"]} mt-30 mb-30`}>
      <span className={`text_type_digits-large mb-8`}>{order ? order.order.number : null}</span>
      <span className={`text_type_main-medium mb-15`}>идентификатор заказа</span>
      <img className={`mb-15`} src={graphics} alt={"checked_image"}/>
      <span className={`text_type_main-default mb-2`}>Ваш заказ начали готовить</span>
      <span className={`${styles["text-bottom"]} text_type_main-default`}>Дождитесь готовности на орбитальной станции</span>
    </div>
  )
};