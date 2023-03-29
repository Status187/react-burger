import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import * as React from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { getSelectedBuns, getSelectedIngredients } from '../../../../services/selectors';
import styles from './RenderListData.module.css';

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

  const countData = React.useMemo(() => {
    const res: any = {};
    if (bun) {
        res[bun._id] = 2;
    }
    for (let item of ingredients) {
        if (!(item._id in res)) {
            res[item._id] = 0;
        }
        res[item._id]++;
    }
    return res;
  }, [ ingredients, bun ]);

  const [{isDrag}, refDragItem] = useDrag({
    type: el.type,
    item: el,
    collect: (monitor) => ({
      isDrag: monitor.isDragging()
    })
  });

  const HandleClick = () => {
    openModal();
  };

  return (
    <>
    {el.type === categoryTypesElement && (
      !isDrag && (<div className={`${styles["cart"]}`} key={el._id + 'cart'}
       onClick={() => {HandleClick()}}

       ref={refDragItem}
       >
        <img src={el.image} alt={el.name} className='ml-4 mr-4'/>
        <div>
          <div className={`${styles["price"]} text_type_digits-default mt-1 mb-1`}>{el.price}<CurrencyIcon type={'secondary'} /></div>
        </div>
        <span className={`${styles["description"]} text_type_main-default`}>{el.name}</span>
        {countData[el._id] > 0 && <Counter count={countData[el._id]} size="default" extraClass={styles.count}/>}
      </div>))
      }
    </>
  )
}