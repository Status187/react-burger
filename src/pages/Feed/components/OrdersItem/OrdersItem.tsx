import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import * as React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import styles from './OrdersItem.module.css';
import { IOrderList } from "./interfaces";
import { useSelector } from "react-redux";
import { getIngredients } from "../../../../services/selectors";
import { IData } from "../../../../types";

export const OrdersItem: React.FC<IOrderList> = ({order, isPersonality}) => {
    const location = useLocation();
  
    const { ingredients } = useSelector(getIngredients);
  
    const status = React.useMemo(
      () => order.status === 'done' ? 'Выполнен' : order.status === 'created' ? 'Создан' : 'Готовится', [order]
    );
  
    const colorStatus = React.useMemo(
      () => order.status === 'done' ? styles.status_done : styles.status_default
      , [order]
    );
  
    const orderIngredients = React.useMemo(
      () => order.ingredients.map((elId: string) => (
        ingredients.find((el: IData) => el._id === elId)
      )), [ingredients, order]
    );

    const maximumNumberElements = 6;
  
    const firstSixItems = React.useMemo(
      () => orderIngredients.slice(0, maximumNumberElements)
      , [orderIngredients]
    );
  
    const orderAmount = React.useMemo(
      () => orderIngredients.reduce( (amount: number, el: IData | undefined) => el!.price + amount, 0)
      , [orderIngredients]
    );
  
    return (
      <Link className={`${styles.order}`} to={`${location.pathname}/${order.number}`} state={{ location: location }}> 
      <div className='m-6'>
        <div className={styles.order_header}>
          <p className='text text_type_digits-default'>#{order.number}</p>
          <FormattedDate date={new Date(order.createdAt)} className='text text_type_main-default text_color_inactive' />
        </div>
      </div>
      <p className={`${styles.title_order} text text_type_main-medium`}>
        {order.name}
      </p>
      {isPersonality && status &&
        <p className={`${styles.status_order} ${colorStatus} text text_type_main-default`}>
          {status}
        </p>
      }
      <div className={styles.filling}>
        <div className={styles.images_selection}>
          {firstSixItems && firstSixItems.map((item: IData | undefined, i: number) => {
            let right = -2 * 10;
            let countHide = order.ingredients.length - maximumNumberElements;
            return (
              <span
                key={i}
                style={{ marginRight: right }}
                className={styles.image_fill}>
                <img
                  style={{ opacity: maximumNumberElements === (i + 1) && countHide > 0 ? '0.4' : '1' }}
                  src={item!.image_mobile}
                  alt={item!.name}
                  className={styles.image_position} />
                {countHide > 0 && i === (maximumNumberElements - 1) &&
                  <span className={`${styles.count_hidden} text text_type_main-default`}> + {countHide}</span>
                }
              </span>
            )
          })}
        </div>
        <div className={styles.price}>
          <span className={`text text_type_digits-default`}>{orderAmount}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};