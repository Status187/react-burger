import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import styles from './ResetPassword.module.css';
import { useAppDispatch } from '../../services/store';
import { getResetPassword } from '../../services/selectors';
import { useSelector } from 'react-redux';
import { postResetPassword } from '../../services/action/resetPasswordAction';
import { LOGIN_ROUTE_URL, ORIGIN_ROUTE_URL } from '../../constants';
import { useForm } from '../../hooks/useForm';

export const ResetPassword = (): JSX.Element => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const { fargotSuccess } = useSelector(getResetPassword);

  // const [password, setPassword] = React.useState('');
  // const [emailCode, setEmailCode] = React.useState('');

  const {values, handleChange} = useForm({
    password: '',
    token: ''
  });

  const postNewPassword = () => {
    dispatch(postResetPassword(values.password, values.token, navigate))
  };

  return(
    // <>
    //   {!fargotSuccess ? <Navigate to={ location.state?.from || ORIGIN_ROUTE_URL } /> : 
        <div className={styles.main}>
          <div className={`${styles["main-form"]}`}>
            <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
            <PasswordInput extraClass="mb-6" placeholder='Введите новый пароль' name="password" value={values.password} onChange={handleChange} />
            <Input extraClass="mb-6" placeholder='Введите код из письма' name="token" value={values.token} onChange={handleChange} />
            <Button type="primary" extraClass="mb-20" htmlType="submit" onClick={() => postNewPassword()}>Сохранить</Button>
            <p className="text text_type_main-default text_color_inactive mb-4">Вспомнили пароль?<Link className="text_color_accent ml-2" to={LOGIN_ROUTE_URL}>Войти</Link></p>
          </div>
        </div>
    //   }
    // </>
  )
}