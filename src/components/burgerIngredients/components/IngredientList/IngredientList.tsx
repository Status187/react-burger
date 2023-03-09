import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IData, TCardElement } from '../../../../types';
import styles from './IngredientList.module.css'

const categoryTypes = {
  bun: "bun",
  main: "main",
  sauce: "sauce"
}

export const CardElement = ({
  data = []
}:TCardElement): JSX.Element => {

  const renderListData = (data: IData[], categoryTypesElement: string) => {
    return (
      data.map((el) => (
        el.type === categoryTypesElement && (
        <div className={`${styles["cart"]}`}  key={el._id + 'cart'}>
          <img src={el.image} alt={el.name} className='ml-4 mr-4'/>
          <div>
            <div className={`${styles["price"]} text_type_digits-default mt-1 mb-1`}>{el.price}<CurrencyIcon type={'secondary'} /></div>
          </div>
          <span className={`${styles["description"]} text_type_main-default`}>{el.name}</span>
        </div>)
        )
      )
    )
  }

  return (
    <div className={`${styles["category-wraper"]} custom-scroll`}>
      <div>
        <span className={`${styles["category-title"]}`}>Булки</span>
        <div className={`${styles["category-list"]}`}>{renderListData(data, categoryTypes.bun)}</div>
      </div>
      <div>
        <span className={`${styles["category-title"]}`}>Соусы</span>
        <div className={`${styles["category-list"]}`}>{renderListData(data, categoryTypes.sauce)}</div>
      </div>
      
      <div>
        <span className={`${styles["category-title"]}`}>Начинки</span>
        <div className={`${styles["category-list"]}`}>{renderListData(data, categoryTypes.main)}</div>
      </div>
    </div>
  )
}