import * as React from 'react';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './HeaderLink.module.css';
import { NavLink } from 'react-router-dom';

type THeaderLink = {
  href: string;
  active?: boolean;
  iconVariant: string;
  children: string;
  disabled?: boolean;
}

export const HeaderLink = ({
  href,
  active,
  iconVariant,
  children,
  disabled
}:THeaderLink):JSX.Element  => {

  const iconSelection = (iconVariant: string, isActive: boolean) => {
    switch (iconVariant) {
      case "constructor":
        return (<BurgerIcon type={ isActive ? 'primary' : 'secondary'} />)
      case "orderFeed":
        return (<ListIcon type={ isActive ? 'primary' : 'secondary'} />)
      case "personalAccount":
        return (<ProfileIcon type={ isActive ? 'primary' : 'secondary'} />)
        default: return <></>
    }
  };
  
  return (
    <NavLink to={href} className={`${styles["header-list-disabled"]}`}>
      {({ isActive }) => (
        <>
          <div className={`${styles["item-icon"]} ml-5 mr-2`}>{iconSelection(iconVariant, isActive)}</div>
          <span className={`${styles["item-text"]} text text_type_main-default mr-5 ${isActive ? "text_color_primary" : "text_color_inactive"}`}>
              {children}
          </span>
        </>
      )}
    </NavLink>
  )
}