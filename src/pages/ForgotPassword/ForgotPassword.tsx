import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import * as React from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import styles from './ForgotPassword.module.css';
import { useAppDispatch } from '../../services/store';
import { useSelector } from 'react-redux';
import { getAuth } from '../../services/selectors';
import { getForgotPassword } from '../../services/action/resetPasswordAction';
import { LOGIN_ROUTE_URL, ORIGIN_ROUTE_URL } from '../../constants';
import { useForm } from '../../hooks/useForm';

export const ForgotPassword = (): JSX.Element => {

  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector(getAuth);

  // const [email, setEmail] = React.useState('')
  // const onChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
  //   setEmail(e.target.value)
  // }

  const {values, handleChange} = useForm({
    email: ''
  });

  const postForgotRequest = () => {
    dispatch(getForgotPassword(values.email, navigate))
  }

  return(
    <>
      { user ? <Navigate to={ location.state?.from || ORIGIN_ROUTE_URL } /> : 
        <div className={styles.main}>
          <div className={`${styles["main-form"]}`}>
            <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
            <EmailInput extraClass="mb-6" placeholder='Укажите e-mail' isIcon={false} name="email" value={values.email} onChange={handleChange} />
            <Button type="primary" extraClass="mb-20" htmlType="submit" onClick={() => postForgotRequest()}>Восстановить</Button>
            <p className="text text_type_main-default text_color_inactive mb-4">Вспомнили пароль?<Link className="text_color_accent ml-2" to={LOGIN_ROUTE_URL}>Войти</Link></p>
          </div>
        </div>
      }
    </>
  )
}