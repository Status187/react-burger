import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';
import { HeaderLink } from './components/HHeaderLink/HeaderLink';

export const AppHeader = ()=> {
  return (
    <header className={`${styles["header"]} text_type_main-default`}>
      <nav className={`${styles["header-nav"]}`}>
        <ul className={`${styles["header-list"]}`}>
          <li className={`${styles["item-left"]} mb-4 mt-4`}>
            <HeaderLink iconVariant={"constructor"} children="Конструктор" active/>
            <HeaderLink iconVariant={"orderFeed"} children="Лента заказов"/>
          </li>
          <li className={`${styles["header-logo"]}`}><Logo /></li>
          <li className={`${styles["item-right"]} mb-4 mt-4`}><HeaderLink iconVariant={"personalAccount"} children="Личный кабинет"/></li>
        </ul>
      </nav>
    </header>
  )
}
