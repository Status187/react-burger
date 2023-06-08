import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IOrdersDetails } from './interfaces';
import { IWsOrder } from '../../../../types';
import styles from './OrdersDetails.module.css';
import { lIMITED_QUANTITY } from '../../../../constants';

export const OrdersDetails: React.FC<IOrdersDetails> = ({ data }) => {
  const location = useLocation();

  const allReadyOrders = React.useMemo(
    () => data.orders.filter((elem: IWsOrder) => elem.status === 'done')
      .map((elem: IWsOrder) => elem.number),
    [data.orders]
  );
  const AllOrdersInProgress = React.useMemo(
    () => data.orders.filter((elem: IWsOrder) => elem.status === 'pending')
      .map((elem: IWsOrder) => elem.number),
    [data.orders]
  );

  const ordersСompleted = React.useMemo(() => allReadyOrders.slice(0, lIMITED_QUANTITY), [allReadyOrders]);
  const ordersInProgress = React.useMemo(() => AllOrdersInProgress.slice(0, lIMITED_QUANTITY),[AllOrdersInProgress]);

  return (
    <>
      <div className={`${styles.list} mb-15`}>
        <section className={styles.list_orders_done}>
          <h2 className="text text_type_main-medium">Готовы:</h2>
          <div className={`${styles.list_orders_numbers} mt-12`}>
            <div className={styles.grid_orders}>
              {ordersСompleted.map((item, index) => (
                <div key={index} className="mt-2 mr-8">
                  <Link to={`${item}`} state={{ location: location }} className={styles.ready_order}>
                    <span className="text text_type_digits-default">{item}</span>
                  </Link>
                </div>
                )
              )}
            </div>
          </div>
        </section>
        <section className={styles.list_orders_at_work}>
          <h2 className="text text_type_main-medium">В работе:</h2>
          <div className={styles.list_orders_numbers}>
            <div className={styles.grid_orders}>
              {ordersInProgress.map((item, index) => (
                <div key={index} className="mt-2 mr-8">
                  <Link to={`${item}`} state={{ location: location }} className={styles.work_order}>
                    <span className="text text_type_digits-default">{item}</span>
                  </Link>
                </div>
                )
              )}
            </div>
          </div>
        </section>
      </div>
      <div>
        <div className="text text_type_main-medium">Выполнено за все время:</div>
        <div className={`${styles.shadow} text text_type_digits-large mb-8`}>{data.total}</div>
      </div>
      <div>
        <div className="text text_type_main-medium">Выполнено за сегодня:</div>
        <div className={`${styles.shadow} text text_type_digits-large mb-8`}>{data.totalToday}</div>
      </div>
    </>
  );
};