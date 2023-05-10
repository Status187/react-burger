import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import styles from './ResetPassword.module.css';
import { useAppDispatch } from '../../services/store';
import { getResetPassword } from '../../services/selectors';
import { useSelector } from 'react-redux';
import { postResetPassword } from '../../services/action/resetPasswordAction';

export const ResetPassword = (): JSX.Element => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { fargotSuccess} = useSelector(getResetPassword);

  const [password, setPassword] = React.useState('');
  const [emailCode, setEmailCode] = React.useState('');

  const postNewPassword = () => {
    dispatch(postResetPassword(password, emailCode, navigate))
  };

  return(
    <>
      {!fargotSuccess ? <Navigate to={ location.state?.from || '/' } /> : 
        <div className={styles.main}>
          <div className={`${styles["main-form"]}`}>
            <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
            <PasswordInput extraClass="mb-6" placeholder='Введите новый пароль' name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Input extraClass="mb-6" placeholder='Введите код из письма' name="token" value={''} onChange={(e) => setEmailCode(e.target.value)} />
            <Button type="primary" extraClass="mb-20" htmlType="submit" onClick={() => postNewPassword()}>Сохранить</Button>
            <p className="text text_type_main-default text_color_inactive mb-4">Вспомнили пароль?<Link className="text_color_accent ml-2" to={'/login'}>Войти</Link></p>
          </div>
        </div>
      }
    </>
  )
}