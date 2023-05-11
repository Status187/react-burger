import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import * as React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import styles from './Register.module.css';
import { useSelector } from 'react-redux';
import { userRegistration } from '../../services/action/authAction';
import { useAppDispatch } from '../../services/store';
import { getAuth } from '../../services/selectors';
import { LOGIN_ROUTE_URL, ORIGIN_ROUTE_URL } from '../../constants';

export const Register = (): JSX.Element => {

  const dispatch = useAppDispatch();
  const location = useLocation();

  const { user } = useSelector(getAuth);

  const [email, setEmail] = React.useState('')
  const onChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(e.target.value)
  }

  const [password, setPassword] = React.useState('')

  const [name, setName] = React.useState('');

  const postRegister = () => {
    dispatch(userRegistration(name, email, password));
  };

  return(
    <>
      { user ? <Navigate to={ location.state?.from || ORIGIN_ROUTE_URL } /> : 
        <div className={styles.main}>
          <div className={`${styles["main-form"]}`}>
            <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
            <Input placeholder="Имя" extraClass="mb-6" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            <EmailInput extraClass="mb-6" name="email" value={email} onChange={onChange} />
            <PasswordInput extraClass="mb-6" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="mb-20">
              <Button type="primary" extraClass="mb-20" htmlType="submit" onClick={() => postRegister()}>Зарегистрироваться</Button>
            </div>
            <p className="text text_type_main-default text_color_inactive mb-4">Уже зарегистрированы? <Link className="text_color_accent ml-2" to={LOGIN_ROUTE_URL}>Войти</Link></p>
          </div>
        </div>
      }
    </>
  )
}