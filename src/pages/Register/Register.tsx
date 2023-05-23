import * as React from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './Register.module.css';
import { userRegistration } from '../../services/action/authAction';
import { useAppDispatch } from '../../services/store';
import { LOGIN_ROUTE_URL } from '../../constants';
import { useForm } from '../../hooks/useForm';

export const Register = (): JSX.Element => {

  const dispatch = useAppDispatch();

  const submitForm = React.useCallback((values: { name?: string; email?: string; password?: string; }) => {
    dispatch(userRegistration(values.name!, values.email!, values.password!));
  }, [dispatch]);

  const {values, handleChange, onSubmit} = useForm({
    name: '',
    email: '',
    password: ''
  }, submitForm);

  return(
    <div className={styles.main}>
      <form className={`${styles["main-form"]}`} onSubmit={onSubmit}>
        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
        <Input placeholder="Имя" extraClass="mb-6" name="name" value={values.name as string} onChange={handleChange} />
        <EmailInput extraClass="mb-6" name="email" value={values.email} onChange={handleChange} />
        <PasswordInput extraClass="mb-6" name="password" value={values.password as string} onChange={handleChange} />
        <div className="mb-20">
          <Button type="primary" extraClass="mb-20" htmlType="submit">Зарегистрироваться</Button>
        </div>
        <p className="text text_type_main-default text_color_inactive mb-4">Уже зарегистрированы? <Link className="text_color_accent ml-2" to={LOGIN_ROUTE_URL}>Войти</Link></p>
      </form>
    </div>
  )
}