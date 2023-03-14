import React from 'react';
import { IElement } from '../../types';
import styles from './IngredientDetails.module.css';

export const IngredientDetails = ({
  calories,
  carbohydrates,
  fat,
  proteins,
  image_large,
  name
}:IElement) => {
  return (
    <div className={`${styles["modal-order"]}`}>
      <div className={`${styles["modal-header"]} mt-15 ml-10 mr-10`}>
        <span className={`${styles["modal-title"]} text_type_main-large`}>Детали ингредиента</span>
      </div>
      <div className={`${styles["modal-additionally"]}`}>
        <img src={image_large} alt={name} className={`${styles["modal-image"]}`}/>

        <span className={`${styles["modal-name"]} text_type_main-medium mt-4 mb-8`}>{name}</span>

        <div className={`${styles["modal-table"]} mb-15`}>
          <div className={`${styles["modal-table_wrapper"]}`}>
            <span className={`${styles["modal-table_name"]} text_type_main-default`}>Калории,ккал</span>
            <span className={`${styles["modal-table_value"]} text_type_digits-default`}>{calories}</span>
          </div>
          <div className={`${styles["modal-table_wrapper"]}`}>
            <span className={`${styles["modal-table_name"]} text_type_main-default`}>Белки, г</span>
            <span className={`${styles["modal-table_value"]} text_type_digits-default`}>{proteins}</span>
          </div>
          <div className={`${styles["modal-table_wrapper"]}`}>
            <span className={`${styles["modal-table_name"]} text_type_main-default`}>Жиры, г</span>
            <span className={`${styles["modal-table_value"]} text_type_digits-default`}>{fat}</span>
          </div>
          <div className={`${styles["modal-table_wrapper"]}`}>
            <span className={`${styles["modal-table_name"]} text_type_main-default`}>Углеводы, г</span>
            <span className={`${styles["modal-table_value"]} text_type_digits-default`}>{carbohydrates}</span>
          </div>
        </div>
      </div>
    </div>
  )
}