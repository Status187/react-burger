import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from './OrdersItem.module.css';
import { IOrderList } from "./interfaces";
import { getIngredients } from "../../../../services/selectors";
import { IInitialState } from "../../../../types";
import { MAXIMUM_NUMBER_ELEMENTS } from "../../../../constants";
import { useAppSelector } from "../../../../services/store";

export const OrdersItem: React.FC<IOrderList> = ({order}) => {
  const location = useLocation();

  const { data }: IInitialState = useAppSelector(getIngredients);

  const orderIngredients = React.useMemo(
    () => order.ingredients.map((elId) => {
      const matchingId = data.find((el) => el._id === elId);
      return matchingId
    }), [data, order.ingredients]
  );

  const firstElements = React.useMemo(
    () => orderIngredients.slice(0, MAXIMUM_NUMBER_ELEMENTS)
    , [orderIngredients]
  );
  
  const orderAmount: number = React.useMemo(
    () => orderIngredients.reduce( (amount, el) => (el?.price || 0) + amount, 0)
    , [orderIngredients]
  );

  const hideExcess = order.ingredients.length - MAXIMUM_NUMBER_ELEMENTS;
  const calc = (-2 * 10);
  
  return (
    <Link className={`${styles.link}`} to={`${location.pathname}/${order.number}`} state={{ background: location }}> 
      <div className='m-6'>
        <div className={styles.link_header}>
          <span className='text text_type_digits-default'>{'#' + order.number}</span>
          <FormattedDate date={new Date(order.createdAt)} className='text text_type_main-default text_color_inactive ml-4' />
        </div>
      </div>
      <div className={`${styles.title} text text_type_main-medium`}>
        {order.name}
      </div>
      <div className={styles.ingredients}>
        <div className={styles.ingredients_images}>
          {firstElements && firstElements.map((item, el) => {
            return (
              <span 
                key={el}
                style={{ marginRight: calc }}
                className={`${styles["ingredients_image"]}`}>

                <img
                  style={{ opacity: MAXIMUM_NUMBER_ELEMENTS === (el + 1) && hideExcess > 0 ? '0.5' : '1' }}
                  src={item?.image_mobile}
                  alt={item?.name}
                />

                {
                  hideExcess > 0 && el === (MAXIMUM_NUMBER_ELEMENTS - 1) &&
                  <span className={`${styles.ingredients_hidden} text text_type_main-default`}>{'+' + hideExcess}</span>
                }
              </span>
            )
          })}
        </div>
        <div className={styles.amount}>
          <span className={`text text_type_digits-default`}>{orderAmount}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};