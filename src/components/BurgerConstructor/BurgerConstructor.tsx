import React from 'react';
import { CloseIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { IData } from '../../types';
import styles from './BurgerConstructor.module.css';
import { DrugAndDrop } from './components/DrugAndDrop/DrugAndDrop';
import { InfoAmount } from './components/InfoAmount/InfoAmount';
import { Modal } from '../Modal/Modal';
import graphics from '../../graphics.png';

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
          <div className={`${styles["modal-order"]} mt-30 mb-30`}>
            <div className={`${styles["modal-close"]}`}><CloseIcon type="primary" onClick={() => closeModal()}/></div>
            <span className={`text_type_digits-large mb-8`}>034536</span>
            <span className={`text_type_main-medium mb-15`}>идентификатор заказа</span>
            <img className={`mb-15`} src={graphics} alt={"checked"}/>
            <span className={`text_type_main-default mb-2`}>Ваш заказ начали готовить</span>
            <span className={`${styles["text-bottom"]} text_type_main-default`}>Дождитесь готовности на орбитальной станции</span>
          </div>
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