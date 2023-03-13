import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { IData } from '../../types';
import styles from './BurgerConstructor.module.css';
import { DrugAndDrop } from './components/DrugAndDrop/DrugAndDrop';
import { InfoAmount } from './components/InfoAmount/InfoAmount';
import { Modal } from '../Modal/Modal';
import { OrderDetails } from '../OrderDetails/OrderDetails';

export const BurgerConstructor = (props: { data: IData[]; }) => {

  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const openModal = () => {
    setIsOpenModal(true)
  }

  const closeModal = () => {
    setIsOpenModal(false)
  }

  const getChoice = (data: IData[]) => {

    return (
      data.map((el) => (
        el.type !== "bun" && (
        <div className={`${styles["item-wrapper"]}`} key={el._id + 'ingredients'}>
          <DrugAndDrop />
          <ConstructorElement
            isLocked={false}
            text={el.name}
            price={el.price}
            thumbnail={el.image}
            extraClass={`mr-1`}
          />
        </div>)
    )))
  };

  return (
    <section className={`${styles["constructor-wrapper"]}`}>
      {isOpenModal && <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>}
       <div className={`${styles["constructor-wrapper"]} mt-25`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Флюоресцентная булка R2-D3 (верх)"
          price={988}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-01.png"}
          extraClass={`ml-4 mr-4`}
        />
        <div className={`${styles["ingredients-wrapper"]} custom-scroll`}>{getChoice(props.data)}</div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Флюоресцентная булка R2-D3 (низ)"
          price={988}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-01.png"}
          extraClass={`ml-4 mr-4`}
        />
        <InfoAmount onClick={openModal}/>
    </div>
    </section>
  )
};