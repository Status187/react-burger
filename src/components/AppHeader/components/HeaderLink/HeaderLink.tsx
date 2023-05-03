import React from 'react';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './HeaderLink.module.css';
import { Link, useLocation } from 'react-router-dom';

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
  const { state } = useLocation();
  React.useEffect(() => {
    console.log(state)
  }, [state])

  const iconSelection = (iconVariant: string) => {
    switch (iconVariant) {
      case "constructor":
        return (<BurgerIcon type={ active ? 'primary' : 'secondary'} />)
      case "orderFeed":
        return (<ListIcon type={ active ? 'primary' : 'secondary'} />)
      case "personalAccount":
        return (<ProfileIcon type={ active ? 'primary' : 'secondary'} />)
        default: return <></>
    }
  }
  
  return (
    // active ? 
    // <a href="http://localhost:3000/login" className={`${styles["header-list"]}`}>
    //   <div className={`${styles["item-icon"]} ml-5 mr-2`}>{iconSelection(iconVariant)}</div>
    //   <span className={`${styles["item-text"]} mr-5`}>{children}</span>
    // </a>
    // : 
    // <a href="http://localhost:3000/login" className={`${styles["header-list-disabled"]}`}>
    //   <div className={`${styles["item-icon"]} ml-5 mr-2`}>{iconSelection(iconVariant)}</div>
    //   <span className={`${styles["item-text"]} mr-5`}>{children}</span>
    // </a>
    <Link to={href} className={`${styles["header-list-disabled"]}`}>
      <div className={`${styles["item-icon"]} ml-5 mr-2`}>{iconSelection(iconVariant)}</div>
      <span className={`${styles["item-text"]} mr-5`}>{children}</span>
    </Link>
  )
}