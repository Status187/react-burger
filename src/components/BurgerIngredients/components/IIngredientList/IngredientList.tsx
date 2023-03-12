import React from 'react';
import { CloseIcon, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IData, IElement, TCardElement } from '../../../../types';
import styles from './IngredientList.module.css'
import { Modal } from '../../../Modal/Modal';

const categoryTypes = {
  bun: "bun",
  main: "main",
  sauce: "sauce"
};

export const CardElement = ({
  data = [],
}:TCardElement): JSX.Element => {

  const [isOpenModal, setIsOpenModal] = React.useState(false)
  const [currentIngredient, setCurrentIngredients] = React.useState({
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    proteins: 0,
    image_large: '',
    name: ''
  })

  const getChoice = () => {
    const mockdata = [...data].slice(1, data.length)
    const ids = mockdata.map((item) => item.name);
    return ids
  };

  const openModal = () => {
    setIsOpenModal(true)
  }

  const closeModal = () => {
    setIsOpenModal(false)
  }

  const saveCurrentData = (el: IElement) => {
    setCurrentIngredients({
      calories: el.calories,
      carbohydrates: el.carbohydrates,
      fat: el.fat,
      proteins: el.proteins,
      image_large: el.image_large,
      name: el.name
    })
  }
  
  const renderListData = (data: IData[], categoryTypesElement: string) => {
    return (
      data.map((el) => (
        el.type === categoryTypesElement && (
        <div className={`${styles["cart"]}`} key={el._id + 'cart'}
         onClick={() => {openModal();saveCurrentData(el)}}>
          {getChoice().includes(el.name) && (<Counter count={1} />)}
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
      {isOpenModal && <Modal onClose={closeModal}>
          <div className={`${styles["modal-order"]}`}>
            <div className={`${styles["modal-header"]} mt-15 ml-10 mr-10`}>
              <span className={`${styles["modal-title"]} text_type_main-large`}>Детали ингредиента</span>
              <div className={`${styles["modal-close"]}`}><CloseIcon type="primary" onClick={() => closeModal()}/></div>
            </div>
            <div className={`${styles["modal-additionally"]}`}>
              <img src={currentIngredient.image_large} alt={currentIngredient.name} className={`${styles["modal-image"]}`}/>

              <span className={`${styles["modal-name"]} text_type_main-medium mt-4 mb-8`}>{currentIngredient.name}</span>

              <div className={`${styles["modal-table"]} mb-15`}>
                <div className={`${styles["modal-table_wrapper"]}`}>
                  <span className={`${styles["modal-table_name"]} text_type_main-default`}>Калории,ккал</span>
                  <span className={`${styles["modal-table_value"]} text_type_digits-default`}>{currentIngredient.calories}</span>
                </div>
                <div className={`${styles["modal-table_wrapper"]}`}>
                  <span className={`${styles["modal-table_name"]} text_type_main-default`}>Белки, г</span>
                  <span className={`${styles["modal-table_value"]} text_type_digits-default`}>{currentIngredient.proteins}</span>
                </div>
                <div className={`${styles["modal-table_wrapper"]}`}>
                  <span className={`${styles["modal-table_name"]} text_type_main-default`}>Жиры, г</span>
                  <span className={`${styles["modal-table_value"]} text_type_digits-default`}>{currentIngredient.fat}</span>
                </div>
                <div className={`${styles["modal-table_wrapper"]}`}>
                  <span className={`${styles["modal-table_name"]} text_type_main-default`}>Углеводы, г</span>
                  <span className={`${styles["modal-table_value"]} text_type_digits-default`}>{currentIngredient.carbohydrates}</span>
                </div>
              </div>
            </div>
            
          </div>
        </Modal>}
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