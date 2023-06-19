import * as React from 'react';
import { IOrderList } from './interfaces';
import styles from './OrdersList.module.css';
import { OrdersItem } from '../OrdersItem/OrdersItem';

export const OrdersList: React.FC<IOrderList> = ({ data }) => {
  return (
    <div className={`${styles.orders} custom-scroll`}>
      {data.orders && data.orders.map((elem, index) =>
        <OrdersItem key={index} order={elem} />
      )}
    </div>
  );
};