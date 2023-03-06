import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { data } from '../../utils/choice';
import styles from './BurgerConstructor.module.css';
import { DrugAndDrop } from './components/DrugAndDrop';

export const BurgerConstructor = ()=> {

  const getChoice = (data: any[]) => {
    return (
      data.map((el) => (
        <div className={`${styles["item-wrapper"]}`}>
          <DrugAndDrop />
          <ConstructorElement
            isLocked={false}
            text={el.name}
            price={el.price}
            thumbnail={el.image}
            extraClass={`mr-1`}
          />
        </div>
    )))
  };

  return (
    <section className={`${styles["constructor-wrapper"]}`}>
       <div className={`${styles["constructor-wrapper"]} mt-25`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          extraClass={`ml-4 mr-4`}
        />
        <div className={`${styles["ingredients-wrapper"]} custom-scroll`}>{getChoice(data)}</div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          extraClass={`ml-4 mr-4`}
        />
    </div>
    </section>
  )
};