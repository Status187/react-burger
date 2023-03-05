import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './cardElement.module.css';

type TCardElement = {
  data: IData[];
}

interface IData {
  id?: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string
  image_mobile: string,
  image_large: string,
  v?: number
}

export const CardElement = ({
  data = []
}:TCardElement): JSX.Element => {

  const renderListData = (data: IData[]) => {
    return (
      data.map((el) => (
          <div className={`${styles["cart"]}`}>
            <img src={el.image} alt="bun" />
            <div>
              <span className={`${styles["price"]} text_type_main-default`}>{el.price}</span>
              <CurrencyIcon type={'secondary'} />
            </div>
            <span>{el.name}</span>
          </div>
        )
      )
    )
  }

  return (
    <>
      {renderListData(data)}
    </>
  )
}