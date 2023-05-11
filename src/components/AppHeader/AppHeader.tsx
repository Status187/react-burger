import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';
import { HeaderLink } from './components/HeaderLink/HeaderLink';
import { LOGIN_ROUTE_URL, NOT_FOUND_ROUTE_URL, ORIGIN_ROUTE_URL } from '../../constants';

export const AppHeader = (): JSX.Element => {
  return (
    <header className={`${styles["header"]} text_type_main-default`}>
      <nav className={`${styles["header-nav"]}`}>
        <ul className={`${styles["header-list"]}`}>
          <li className={`${styles["item-left"]} mb-4 mt-4`}>
            <HeaderLink href={ORIGIN_ROUTE_URL} iconVariant={"constructor"} children="Конструктор" active/>
            <HeaderLink href={NOT_FOUND_ROUTE_URL} iconVariant={"orderFeed"} children="Лента заказов"/>
          </li>
          <li className={`${styles["header-logo"]}`}><Logo /></li>
          <li className={`${styles["item-right"]} mb-4 mt-4`}><HeaderLink href={LOGIN_ROUTE_URL} iconVariant={"personalAccount"} children="Личный кабинет"/></li>
        </ul>
      </nav>
    </header>
  )
}
