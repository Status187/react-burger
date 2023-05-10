import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Profile.module.css';

export const Profile = (): JSX.Element => {

  return(
    <div className={`${styles["main"]}`}>
      <nav className="main-nav page-container-profile-sidebar ml-5 mr-15">
        <ul className={`${styles["main-list"]}`}>
          <li>
            <NavLink to="" end>{({ isActive }) => (
                <span className={`text text_type_main-medium ${isActive ? "text_color_primary" : "text_color_inactive"}`}>Профиль</span>
            )}</NavLink>
          </li>
          <li>
            <NavLink to={'orders'}>{({ isActive }) => (
                <span className={`text text_type_main-medium ${isActive ? "text_color_primary" : "text_color_inactive"}`}>История заказов</span>
            )}</NavLink>
          </li>
          <li>
            <NavLink to={'logout'}>{({ isActive }) => (
                <span className={`text text_type_main-medium ${isActive ? "text_color_primary" : "text_color_inactive"}`}>Выход</span>
            )}</NavLink>
          </li>
        </ul>
        <p className={`${styles["description"]}`}>В этом разделе вы можете изменить свои персональные данные</p>
      </nav>
    </div>
  )
}