import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ResetPassword.module.css';
import { useAppDispatch } from '../../services/store';
import { postResetPassword } from '../../services/action/resetPasswordAction';
import { LOGIN_ROUTE_URL } from '../../constants';
import { useForm } from '../../hooks/useForm';

export const ResetPassword = (): JSX.Element => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submitForm = React.useCallback((values: any) => {
    dispatch(postResetPassword(values.password, values.token, navigate))
  }, [dispatch, navigate]);

  const {values, handleChange, onSubmit} = useForm({
    password: '',
    token: ''
  }, submitForm);

  return(
    <div className={styles.main}>
      <form className={`${styles["main-form"]}`} onSubmit={onSubmit}>
        <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
        <PasswordInput extraClass="mb-6" placeholder='Введите новый пароль' name="password" value={values.password} onChange={handleChange} />
        <Input extraClass="mb-6" placeholder='Введите код из письма' name="token" value={values.token} onChange={handleChange} />
        <Button type="primary" extraClass="mb-20" htmlType="submit">Сохранить</Button>
        <p className="text text_type_main-default text_color_inactive mb-4">Вспомнили пароль?<Link className="text_color_accent ml-2" to={LOGIN_ROUTE_URL}>Войти</Link></p>
      </form>
    </div>
  )
}