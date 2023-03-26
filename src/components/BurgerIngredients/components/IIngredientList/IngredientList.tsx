import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IData, IElement, TCardElement } from '../../../../types';
import styles from './IngredientList.module.css'
import { Modal } from '../../../Modal/Modal';
import { IngredientDetails } from '../../../IngredientDetails/IngredientDetails';
import { useSelector } from 'react-redux';
import { getIngredients } from '../../../../services/selectors';
import { useAppDispatch } from '../../../../services/store';
import { SET_TARGET_TAB } from '../../../../services/action/actionTypes';
import { BUN, SAUCE, FILLINGS, SURPLUS, CATEGORY_TYPES } from '../../../../constants'

export const CardElement = ({
  bunsRef,
  soucesRef,
  fillingsRef
}:TCardElement): JSX.Element => {

  const { data } = useSelector(getIngredients);
  const dispatch = useAppDispatch();

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

  const handleDrag = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault();
  }; 
  
  const renderListData = (data: IData[], categoryTypesElement: string) => {
    return (
      data.map((el) => (
        el.type === categoryTypesElement && (
        <div className={`${styles["cart"]}`} key={el._id + 'cart'}
         onClick={() => {openModal();saveCurrentData(el)}}>
          {/* {getChoice().includes(el.name) && (<Counter count={1} />)} */}
          <img src={el.image} alt={el.name} className='ml-4 mr-4' draggable onDrag={(e) => handleDrag(e)}/>
          <div>
            <div className={`${styles["price"]} text_type_digits-default mt-1 mb-1`}>{el.price}<CurrencyIcon type={'secondary'} /></div>
          </div>
          <span className={`${styles["description"]} text_type_main-default`}>{el.name}</span>
        </div>)
        )
      )
    )
  };

  const handleScroll = (e: { currentTarget: { scrollTop: any; }; }) => {
    const scrollPosition = e.currentTarget.scrollTop;
    const soucesContainer = soucesRef.current !== null && soucesRef.current.offsetTop;
    const fillingsContainer = fillingsRef.current !== null && fillingsRef.current.offsetTop;
    if (scrollPosition + SURPLUS <= soucesContainer) {
      dispatch({ type: SET_TARGET_TAB, tab: BUN})
    }
    else if (scrollPosition + SURPLUS <= fillingsContainer) {
      dispatch({ type: SET_TARGET_TAB, tab: SAUCE})
    } else {
      dispatch({ type: SET_TARGET_TAB, tab: FILLINGS})
    }
}

  return (
    <div className={`${styles["category-wraper"]} custom-scroll`} onScroll={handleScroll}>
      {isOpenModal && <Modal onClose={closeModal}>
          <IngredientDetails {...currentIngredient}/>
        </Modal>}
      <div ref={bunsRef}>
        <span className={`${styles["category-title"]}`}>Булки</span>
        <div className={`${styles["category-list"]}`}>{renderListData(data, CATEGORY_TYPES.bun)}</div>
      </div>
      <div ref={soucesRef}>
        <span className={`${styles["category-title"]}`}>Соусы</span>
        <div className={`${styles["category-list"]}`}>{renderListData(data, CATEGORY_TYPES.sauce)}</div>
      </div>
      <div ref={fillingsRef}>
        <span className={`${styles["category-title"]}`}>Начинки</span>
        <div className={`${styles["category-list"]}`}>{renderListData(data, CATEGORY_TYPES.main)}</div>
      </div>
    </div>
  )
}