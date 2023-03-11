import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { IData } from '../../types';
import { data } from '../../utils/choice';
import styles from './BurgerConstructor.module.css';
import { DrugAndDrop } from './components/DrugAndDrop/DrugAndDrop';
import { InfoAmount } from './components/InfoAmount/InfoAmount';

export const BurgerConstructor = ()=> {

  const getChoice = (data: IData[]) => {
    return (
      data.map((el) => (
        <div className={`${styles["item-wrapper"]}`} key={el._id + 'ingredients'}>
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
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          extraClass={`ml-4 mr-4`}
        />
        <div className={`${styles["ingredients-wrapper"]} custom-scroll`}>{getChoice(data)}</div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          extraClass={`ml-4 mr-4`}
        />
        <InfoAmount />
    </div>
    </section>
  )
};