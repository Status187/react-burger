import * as React from 'react';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { getAuth } from '../../services/selectors';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { authlogin } from '../../services/action/authAction';
import { FORGOT_ROUTE_URL, REGISTER_ROUTE_URL } from '../../constants';
import { useForm } from '../../hooks/useForm';

export const LoginPage = (): JSX.Element => {

  const { status, loginFailure } = useAppSelector(getAuth);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const submitForm = React.useCallback((values: { email: string; password?: string; }) => {
      dispatch(authlogin(values.email, values.password!, navigate));
  }, [dispatch, navigate]);

  const {values, handleChange, onSubmit} = useForm({
    email: '',
    password: ''
  }, submitForm);

  return(
    <div className={styles.main}>
      <form className={`${styles["main-form"]}`} onSubmit={onSubmit}>
        <h1 className="text_type_main-medium text mb-6">Вход</h1>
        <EmailInput data-testid="email-entrance" extraClass="mb-6" name="email" value={values.email} onChange={handleChange} />
        <PasswordInput data-testid="password-entrance" extraClass="mb-6" name="password" value={values.password as string} onChange={handleChange} />
        { loginFailure && <p className="text text_type_main-default text_color_error">{status}</p>}
        <Button type="primary" extraClass="mb-20" htmlType="submit">Войти</Button>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вы — новый пользователь?
          <Link className="text_color_accent ml-2" to={REGISTER_ROUTE_URL}>Зарегистрироваться</Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль? 
          <Link className="text_color_accent ml-2" to={FORGOT_ROUTE_URL}>Восстановить пароль</Link>
        </p>
      </form>
    </div>
  )
}