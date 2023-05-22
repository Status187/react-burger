import * as React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './Profile.module.css';
import { ORIGIN_ROUTE_URL, PROFILE_ORDERS_ROUTE_URL } from '../../constants';
import { useAppDispatch } from '../../services/store';
import { logout } from '../../services/action/authAction';

export const Profile = (): JSX.Element => {

  const dispatch = useAppDispatch();

  const onLogout = React.useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

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
            <NavLink to={PROFILE_ORDERS_ROUTE_URL}>{({ isActive }) => (
              <span className={`text text_type_main-medium ${isActive ? "text_color_primary" : "text_color_inactive"}`}>История заказов</span>
            )}</NavLink>
          </li>
          <li>
            <NavLink to={ORIGIN_ROUTE_URL} onClick={onLogout}>{({ isActive }) => (
              <span className={`text text_type_main-medium ${isActive ? "text_color_primary" : "text_color_inactive"}`}>Выход</span>
            )}</NavLink>
          </li>
        </ul>
        <p className={`${styles["description"]}`}>В этом разделе вы можете изменить свои персональные данные</p>
      </nav>
      <div><Outlet /></div>
    </div>
  )
}