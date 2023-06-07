import { useEffect } from 'react';
import { getAllOrders } from '../../services/selectors';
import { Loading } from '../../components/loading/Loading';
import styles from './FeedPage.module.css';
import { ALL_ORDERS_END, ALL_ORDERS_START } from '../../services/action/allOrdersAction';
import { ALL_ORDERS_URL } from '../../constants';
import { useAppDispatch } from '../../services/store';
import { useSelector } from 'react-redux';
import { OrdersList } from './components/OrdersList/OrdersList';
import { OrdersDetails } from './components/OrdersDetails/OrdersDetails';


export const Feed = (): JSX.Element =>  {
  const dispatch = useAppDispatch();
  const { wsConnected, message } = useSelector(getAllOrders);
  console.log(message)

  useEffect(() => {
    dispatch({ type: ALL_ORDERS_START, url: `${ALL_ORDERS_URL}` });
    return () => {
      dispatch({ type: ALL_ORDERS_END });
    }
  }, [dispatch]);

  return (
    <div className="feed">
      {!wsConnected && <Loading />}
      {wsConnected && (
        <>
        <h1 className={`${styles.title} text text_type_main-large`}>Лента заказов</h1>
          <div className={styles.content}>
            <div className={styles.left_wrapper}>
              {message && <OrdersList data={message} />}
            </div>
            <div className={styles.right_wrapper}>
              {message && <OrdersDetails data={message} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};