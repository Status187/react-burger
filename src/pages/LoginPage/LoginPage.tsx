import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { useSelector } from 'react-redux';
import { getAuth } from '../../services/selectors';
import { useAppDispatch } from '../../services/store';
import { authlogin } from '../../services/action/authAction';

export const LoginPage = (): JSX.Element => {

  const { user, status, loginFailure } = useSelector(getAuth);

  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = React.useState('');

  const [email, setEmail] = React.useState('')
  const onChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(e.target.value)
  };

  const onClick = () => {
    dispatch(authlogin(email, password));
  }

  return(
    <>
      { user ? <Navigate to={ location.state?.from || '/' } /> : 
        <div className={styles.main}>
          <div className={`${styles["main-form"]}`}>
            <h1 className="text_type_main-medium text mb-6">Вход</h1>
            <EmailInput extraClass="mb-6" name="email" value={email} onChange={onChange} />
            <PasswordInput extraClass="mb-6" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            { loginFailure && <p className="text text_type_main-default text_color_error">{status}</p>}
            <Button type="primary" extraClass="mb-20" htmlType="submit" onClick={() => onClick()}>Войти</Button>
            <p className="text text_type_main-default text_color_inactive mb-4">
              Вы — новый пользователь?
              <Link className="text_color_accent ml-2" to={'/register'}>Зарегистрироваться</Link>
            </p>
            <p className="text text_type_main-default text_color_inactive">
              Забыли пароль? 
              <Link className="text_color_accent ml-2" to={'/forgot-password'}>Восстановить пароль</Link>
            </p>
          </div>
        </div>
      }
    </>
  )
}