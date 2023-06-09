import React from 'react';
import { IData, TCardElement } from '../../../../types';
import styles from './IngredientList.module.css'
import { Modal } from '../../../Modal/Modal';
import { IngredientDetails } from '../../../IngredientDetails/IngredientDetails';
import { getActiveIngredient, getIngredients } from '../../../../services/selectors';
import { useAppDispatch, useAppSelector } from '../../../../services/store';
import { SET_ACTIVE, SET_TARGET_TAB } from '../../../../services/action/actionTypes';
import { BUN, SAUCE, FILLINGS, SURPLUS, CATEGORY_TYPES, ORIGIN_ROUTE_URL } from '../../../../constants'
import { RenderListData } from '../RenderListData/RenderListData';
import { useLocation, useNavigate } from 'react-router-dom';

export const IngredientList = ({
  bunsRef,
  soucesRef,
  fillingsRef
}:TCardElement): JSX.Element => {

  const { data } = useAppSelector(getIngredients);
  // const currentActive = useAppSelector(getActiveIngredient);

  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  // const location = useLocation();

  // const [isOpenModal, setIsOpenModal] = React.useState(false)

  // const openModal = () => {
  //   setIsOpenModal(true)
  // }

  // const closeModal = () => {
  //   dispatch({type: SET_ACTIVE, item: null})
  //   setIsOpenModal(false);
  //   navigate(ORIGIN_ROUTE_URL, { replace: true, state: { from: location } });
  // };
  
  const renderListData = (data: IData[], categoryTypesElement: string) => {
    return (
      data.map((el) => (
        <RenderListData key={el._id} el={el} categoryTypesElement={categoryTypesElement}/>
        )
      )
    )
  };

  const handleScroll = (e: { currentTarget: { scrollTop: number; } }) => {
    const scrollPosition = e.currentTarget.scrollTop;
    if (soucesRef.current !== null && fillingsRef.current !== null) {
      const soucesContainer = soucesRef.current && soucesRef.current.offsetTop;
      const fillingsContainer = fillingsRef.current && fillingsRef.current.offsetTop;
      if (scrollPosition + SURPLUS <= soucesContainer) {
        dispatch({ type: SET_TARGET_TAB, tab: BUN})
      }
      else if (scrollPosition + SURPLUS <= fillingsContainer) {
        dispatch({ type: SET_TARGET_TAB, tab: SAUCE})
      } else {
        dispatch({ type: SET_TARGET_TAB, tab: FILLINGS})
      }
    }
}

  return (
    <div className={`${styles["category-wraper"]} custom-scroll`} onScroll={handleScroll}>
      {/* {isOpenModal && <Modal onClose={closeModal}>
          <IngredientDetails {...currentActive}/>
        </Modal>} */}
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