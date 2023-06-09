import * as React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';
import { HeaderLink } from './components/HeaderLink/HeaderLink';
import { FEED_ROUTE_URL, LOGIN_ROUTE_URL, ORIGIN_ROUTE_URL, PROFILE_ROUTE_URL } from '../../constants';
import { getAuth } from '../../services/selectors';
import { useAppSelector } from '../../services/store';
import { IInitialStateAuth } from '../../types';
import { Link } from 'react-router-dom';

export const AppHeader = (): JSX.Element => {

  const { user }: IInitialStateAuth = useAppSelector(getAuth);

  return (
    <header className={`${styles["header"]} text_type_main-default`}>
      <nav className={`${styles["header-nav"]}`}>
        <ul className={`${styles["header-list"]}`}>
          <li className={`${styles["item-left"]} mb-4 mt-4`}>
            <HeaderLink href={ORIGIN_ROUTE_URL} iconVariant={"constructor"} children="Конструктор"/>
            <HeaderLink href={FEED_ROUTE_URL} iconVariant={"orderFeed"} children="Лента заказов"/>
          </li>
          <li className={`${styles["header-logo"]}`}>
            <Link to={ORIGIN_ROUTE_URL}><Logo/></Link>
          </li>
          <li className={`${styles["item-right"]} mb-4 mt-4`}>
            <HeaderLink href={user?.email.length > 0 ? PROFILE_ROUTE_URL : LOGIN_ROUTE_URL }
            iconVariant={"personalAccount"} children={ user?.email.length > 0 ? user.email : "Личный кабинет" }/>
           </li>
        </ul>
      </nav>
    </header>
  )
}
