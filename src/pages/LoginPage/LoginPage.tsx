import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { useSelector } from 'react-redux';
import { getAuth } from '../../services/selectors';
import { useAppDispatch } from '../../services/store';
import { authlogin } from '../../services/action/authAction';
import { FORGOT_ROUTE_URL, ORIGIN_ROUTE_URL, REGISTER_ROUTE_URL } from '../../constants';
import { useForm } from '../../hooks/useForm';

export const LoginPage = (): JSX.Element => {

  const { user, status, loginFailure } = useSelector(getAuth);

  const dispatch = useAppDispatch();
  const location = useLocation();

  const {values, handleChange} = useForm({
    email: '',
    password: ''
  });

  const onClick = () => {
    dispatch(authlogin(values.email, values.password));
  }

  return(
    // <>
    //   { user ? <Navigate to={ location.state?.from || ORIGIN_ROUTE_URL } /> : 
        <div className={styles.main}>
          <div className={`${styles["main-form"]}`}>
            <h1 className="text_type_main-medium text mb-6">Вход</h1>
            <EmailInput extraClass="mb-6" name="email" value={values.email} onChange={handleChange} />
            <PasswordInput extraClass="mb-6" name="password" value={values.password} onChange={handleChange} />
            { loginFailure && <p className="text text_type_main-default text_color_error">{status}</p>}
            <Button type="primary" extraClass="mb-20" htmlType="submit" onClick={() => onClick()}>Войти</Button>
            <p className="text text_type_main-default text_color_inactive mb-4">
              Вы — новый пользователь?
              <Link className="text_color_accent ml-2" to={REGISTER_ROUTE_URL}>Зарегистрироваться</Link>
            </p>
            <p className="text text_type_main-default text_color_inactive">
              Забыли пароль? 
              <Link className="text_color_accent ml-2" to={FORGOT_ROUTE_URL}>Восстановить пароль</Link>
            </p>
          </div>
        </div>
    //   }
    // </>
  )
}