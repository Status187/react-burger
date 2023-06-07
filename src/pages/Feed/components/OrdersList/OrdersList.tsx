import * as React from 'react';
import { IWsOrder } from '../../../../types';
import { IOrderList } from './interfaces';
import styles from './OrdersList.module.css';
import { OrdersItem } from '../OrdersItem/OrdersItem';

export const OrdersList: React.FC<IOrderList> = ({ data }) => {
  return (
    <div className={styles.orders}>
      {data.orders && data.orders.map((elem: IWsOrder, index: number) =>
        <OrdersItem key={index} order={elem} isPersonality={false} />
      )}
    </div>
  );
};