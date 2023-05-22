import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import * as React from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { SET_ACTIVE } from '../../../../services/action/actionTypes';
import { getSelectedBuns, getSelectedIngredients } from '../../../../services/selectors';
import { useAppDispatch } from '../../../../services/store';
import styles from './RenderListData.module.css';
import { INGREDIENTS_ROUTE_URL } from '../../../../constants';
import { Link, useLocation } from 'react-router-dom';

interface IRendarListData {
  categoryTypesElement: any;
  el: any;
  openModal: () => void;
}

export const RenderListData: React.FC<IRendarListData> = (props): JSX.Element => {
  const {
    categoryTypesElement,
    el,
    openModal
  } = props;

  const ingredients = useSelector(getSelectedIngredients);
  const bun = useSelector(getSelectedBuns);

  const dispatch = useAppDispatch();

  const countData = React.useMemo(() => {
    const stateIds: any = {};
    if ( bun ) {
        stateIds[bun._id] = 2;
    }
    for ( let item of ingredients ) {
        if ( !(item._id in stateIds) ) { stateIds[item._id] = 0; }
        stateIds[item._id]++;
    }
    return stateIds;
  }, [ ingredients, bun ]);

  const [{isDrag}, refDragItem] = useDrag({
    type: el.type,
    item: el,
    collect: (monitor) => ({
      isDrag: monitor.isDragging()
    })
  });

  const sendSelectedData = () => {
    openModal();
    dispatch({type: SET_ACTIVE, item: el});
  }
  
  const location = useLocation();
  React.useEffect(() => {console.log(location)}, [location]);

  return (
    <>
    {el.type === categoryTypesElement && (
      !isDrag && (
        <Link className={`${styles["link"]}`} to={`${INGREDIENTS_ROUTE_URL}/${el._id}`} state={{ background: location }}>
        <div className={`${styles["cart"]}`} onClick={() => {sendSelectedData()}} ref={refDragItem}>
          <img src={el.image} alt={el.name} className='ml-4 mr-4' />
          <div>
            <div className={`${styles["price"]} text_type_digits-default mt-1 mb-1`}>{el.price}<CurrencyIcon type={'secondary'} /></div>
          </div>
          <span className={`${styles["description"]} text_type_main-default`}>{el.name}</span>
          {countData[el._id] > 0 && <Counter count={countData[el._id]} size="default" extraClass={styles.count}/>}
        </div>
        </Link>
      ))
      }
    </>
  )
}