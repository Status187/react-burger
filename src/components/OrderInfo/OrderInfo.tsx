import * as React from 'react';
import styles from './OrderInfo.module.css'
import { useSelector } from 'react-redux';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '../../services/store';
import { IOrderInfo } from './interfaces';
import { useParams } from 'react-router-dom';
import { getOrderAction } from '../../services/action/orderAction';
import { getCurrentOrder, getIngredients } from '../../services/selectors';
import { TCount } from '../../types';

export const OrderInfo: React.FC<IOrderInfo> = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  React.useEffect(() => {
    dispatch(getOrderAction(id));
  }, [dispatch, id]);

  const { order } = useSelector(getCurrentOrder);
  const { data } = useSelector(getIngredients);

  const ingredientsSelectedOrder = React.useMemo(() => {
    const objectGroup: Record<string, TCount> = {};
    const array: TCount[] = [];
    
      if (order === null) {
        return null;
      }
      
      for (let item of order!.ingredients) {
        const ingredient = data.find((el: TCount) => el._id === item);

        if (ingredient) {
          if (!objectGroup[item]) {
            objectGroup[item] = {...ingredient, quantity: 0};
          }
          objectGroup[item].quantity = 1;
        }

      }
      
      for (let item of order!.ingredients) {
        if (objectGroup[item]) {
          array.push(objectGroup[item]);
        }

      }
      return array;
    }, [data, order]
  );

  const amount = React.useMemo(() => {
    if (ingredientsSelectedOrder === null) {
      return null;
    }
    return ingredientsSelectedOrder!.reduce(
      (amount: number, elem: TCount | undefined) => elem!.price + amount, 0)
  }, [ingredientsSelectedOrder]);
  

  const status = React.useMemo(() => {
    if (order === null) {return null}
    if (order!.status === 'done') {
      return 'Выполнен'
    }
    if (order!.status === 'created') {
      return 'Создан'
    } else {
      return 'Готовится'
    }
  }, [order]);
  
  return (
    <div className={styles.wrapper}>
      {order &&
        <>
          <div className={`text text_type_digits-default mb-10 ${styles.number}`}>
            {"#" + order!.number}
          </div>
          <div className={`text text_type_main-medium mb-2`}>
            {order!.name}
          </div>
          <div className={`text text_type_main-default mb-10 ${styles.status}`}>
            {status}
          </div>
          <div className="text text_type_main-medium mb-2">
            {'Состав:'}
          </div>
          <section className={`${styles.container} custom-scroll`}>

            {ingredientsSelectedOrder && ingredientsSelectedOrder.map((item, index) => {
              return (
                <div key={item._id + index} className={`${styles.ingredient_wrapper} mt-4 mr-6`}>
                  <div className={styles.name_wrapper}>
                    <div className={styles.image_wrapper}>
                      <img src={item!.image_mobile} alt={item!.name} />
                    </div>
                    <span className={`text text_type_main-default ml-4 ${styles.name}`}>{item.name}</span>
                  </div>
                  <div className={styles.wrapper_price}>
                    <span className="text text_type_digits-default mr-2">{`${item.quantity} x ${item.price}`}</span>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              )
            })}
          </section>
          <section className={`text text_type_main-default mt-10 mb-6 ${styles.footer}`}>
            <p className='text text_type_main-default text_color_inactive'>
              <FormattedDate date={new Date(order!.createdAt)} className='text text_type_main-default text_color_inactive' />
            </p>

            <div className={styles.count_price}>
              <span className={`text text_type_digits-default mr-2`}>{amount}</span>
              <CurrencyIcon type="primary" />
            </div>
          </section>
        </>
      }
    </div>
  );
};