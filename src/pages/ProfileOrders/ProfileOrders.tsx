import * as React from 'react';
import { Loading } from '../../components/loading/Loading';
import { OrdersList } from '../Feed/components/OrdersList/OrdersList';
import { useAppDispatch } from '../../services/store';
import { useSelector } from 'react-redux';
import { getUserOrders } from '../../services/selectors';
import { API_WS_URL } from '../../constants';
import { USER_ORDERS_END, USER_ORDERS_START } from '../../services/action/userOrdersAction';
import { IListOrders } from '../../types';

export const ProfileOrders = (): JSX.Element => {

  const dispatch = useAppDispatch();
    const { wsConnected, error, message } = useSelector(getUserOrders);

    const messageSorted: IListOrders | null = React.useMemo(() => {
      if (!message) {
        return null;
      }
      const orders = [...message.orders];
      return { ...message, orders: orders.sort((a, b) => b.number - a.number) };
    }, [message]);

    React.useEffect(() => {
      dispatch({ type: USER_ORDERS_START, url: `${API_WS_URL}/orders`, addToken: true });
      return () => {
        dispatch({ type: USER_ORDERS_END });
      }
    }, [dispatch]);

  return (
    <>
      {!wsConnected && <Loading />}
      {!message ?
        <div>
          <h1 className="text mb-4 mt-4">История заказов</h1>
          <span className="text text_color_inactive">История заказов пуста</span>
        </div>
          :
        <div>
          {!!error && <p className={`mb-2 error-text text text_type_main-default`}>{error}</p>}
          {wsConnected && !!messageSorted && (
              <OrdersList data={messageSorted!} />
          )}
        </div>
      }
    </>
  );
};