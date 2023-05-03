import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LoginPage.module.css';

export const LoginPage = (): JSX.Element => {

  const onChange = () => {
    console.log('---')
  }

  return(
    <div className={styles.main}>
      <form className={`${styles["main-form"]}`}>
          <>
            <h1 className="text_type_main-medium text mb-6">Вход</h1>
            <EmailInput extraClass="mb-6" name="email" value={''} onChange={onChange} />
            <PasswordInput extraClass="mb-6" name="password" value={''} onChange={onChange} />
            <Button type="primary" extraClass="mb-20" htmlType="submit">Войти</Button>
            <p className="text text_type_main-default text_color_inactive mb-4">
              Вы — новый пользователь?
              <Link className="text_color_accent ml-2" to={'/registration'}>Зарегистрироваться</Link>
            </p>
            <p className="text text_type_main-default text_color_inactive">
              Забыли пароль? 
              <Link className="text_color_accent ml-2" to={''}>Восстановить пароль</Link>
            </p>
          </>
      </form>
    </div>
  )
}