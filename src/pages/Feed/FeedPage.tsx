import { useEffect } from 'react';
import { getAllOrders } from '../../services/selectors';
import { Loading } from '../../components/loading/Loading';
import styles from './FeedPage.module.css';
import { ALL_ORDERS_END, ALL_ORDERS_START } from '../../services/action/allOrdersAction';
import { API_WS_URL } from '../../constants';
import { useAppDispatch } from '../../services/store';
import { useSelector } from 'react-redux';


export const Feed = (): JSX.Element =>  {
  const dispatch = useAppDispatch();
  const { wsConnected, error, message } = useSelector(getAllOrders);

  useEffect(() => {
    dispatch({ type: ALL_ORDERS_START, url: `${API_WS_URL}/orders/all` });
    return () => {
      dispatch({ type: ALL_ORDERS_END });
    }
  }, [dispatch]);

  return (
    <div className="feed">
      {!wsConnected && <Loading />}
      {!!error && <p className={`mb-2 error-text text text_type_main-default`}>{error}</p>}
      {wsConnected && !message && (
        <div className={styles.content}>
          <div className={styles.left_wrapper}>
            <span className="text text_type_main-large mt-6">Лента заказов</span>
          </div>
          <div className={styles.right_wrapper}>
          </div>
        </div>
      )}
    </div>
  );
};