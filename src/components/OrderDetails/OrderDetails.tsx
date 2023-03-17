import React, { useContext } from 'react';
import styles from './OrderDetails.module.css';
import graphics from '../../graphics.png';
import { OrderNumberContext } from '../../services/orderNumberContext';

export const OrderDetails = (): JSX.Element => {
  const { serverResponseData } = useContext(OrderNumberContext);
  return (
    <div className={`${styles["modal-order"]} mt-30 mb-30`}>
      <span className={`text_type_digits-large mb-8`}>{serverResponseData.order.number}</span>
      <span className={`text_type_main-medium mb-15`}>идентификатор заказа</span>
      <img className={`mb-15`} src={graphics} alt={"checked_image"}/>
      <span className={`text_type_main-default mb-2`}>Ваш заказ начали готовить</span>
      <span className={`${styles["text-bottom"]} text_type_main-default`}>Дождитесь готовности на орбитальной станции</span>
    </div>
  )
};