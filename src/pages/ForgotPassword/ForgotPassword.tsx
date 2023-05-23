import * as React from 'react';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ForgotPassword.module.css';
import { useAppDispatch } from '../../services/store';
import { getForgotPassword } from '../../services/action/resetPasswordAction';
import { LOGIN_ROUTE_URL } from '../../constants';
import { useForm } from '../../hooks/useForm';

export const ForgotPassword = (): JSX.Element => {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const submitForm = React.useCallback((values: { email: string; }) => {
    dispatch(getForgotPassword(values.email, navigate))
  }, [dispatch, navigate]);

  const {values, handleChange, onSubmit} = useForm({
    email: ''
  }, submitForm);

  return(
    <div className={styles.main}>
      <form className={`${styles["main-form"]}`} onSubmit={onSubmit}>
        <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
        <EmailInput extraClass="mb-6" placeholder='Укажите e-mail' isIcon={false} name="email" value={values.email} onChange={handleChange} />
        <Button type="primary" extraClass="mb-20" htmlType="submit">Восстановить</Button>
        <p className="text text_type_main-default text_color_inactive mb-4">Вспомнили пароль?<Link className="text_color_accent ml-2" to={LOGIN_ROUTE_URL}>Войти</Link></p>
      </form>
    </div>
  )
}