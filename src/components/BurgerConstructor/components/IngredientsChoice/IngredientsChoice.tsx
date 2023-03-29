import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import * as React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { SORT_INGREDIENTS } from '../../../../services/action/actionTypes';
import { useAppDispatch } from '../../../../services/store';
import { DrugAndDrop } from '../DrugAndDrop/DrugAndDrop';
import styles from './IngredientsChoice.module.css';

interface IIngredientsChoice {
  el: any,
  index: number,
  onDelete: (index: number) => void
}

export const IngredientsChoice: React.FC<IIngredientsChoice> = (props): JSX.Element => {
  const {
    el,
    index,
    onDelete
  } = props;

  const dispatch = useAppDispatch();
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: "cart",
    drop(el: any) {
      if (index !== el.index) {
          dispatch({ type: SORT_INGREDIENTS, index1: index, index2: el.index });
      }
    }
  });

  const [, drag] = useDrag({
    type: "cart",
    item: {index},
  });

  drag(drop(ref));

  return (
    <div className={`${styles["item-wrapper"]}`} key={el._id + 'ingredients'} ref={ref}>
      <DrugAndDrop />
      <ConstructorElement
        isLocked={false}
        text={el.name}
        price={el.price}
        thumbnail={el.image}
        extraClass={`mr-1`}
        handleClose={() => onDelete(index)}
      />
    </div>
  )
}