import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import * as React from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import styles from './ForgotPassword.module.css';
import { useAppDispatch } from '../../services/store';
import { useSelector } from 'react-redux';
import { getAuth } from '../../services/selectors';
import { getForgotPassword } from '../../services/action/resetPasswordAction';

export const ForgotPassword = (): JSX.Element => {

  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector(getAuth);

  const [email, setEmail] = React.useState('')
  const onChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(e.target.value)
  }

  const postForgotRequest = () => {
    dispatch(getForgotPassword(email, navigate))
  }

  return(
    <>
      { user ? <Navigate to={ location.state?.from || '/' } /> : 
        <div className={styles.main}>
          <div className={`${styles["main-form"]}`}>
            <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
            <EmailInput extraClass="mb-6" placeholder='Укажите e-mail' isIcon={false} name="email" value={email} onChange={onChange} />
            <Button type="primary" extraClass="mb-20" htmlType="submit" onClick={() => postForgotRequest()}>Восстановить</Button>
            <p className="text text_type_main-default text_color_inactive mb-4">Вспомнили пароль?<Link className="text_color_accent ml-2" to={'/login'}>Войти</Link></p>
          </div>
        </div>
      }
    </>
  )
}