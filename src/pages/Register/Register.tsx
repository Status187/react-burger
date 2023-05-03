import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Register.module.css';

export const Register = (): JSX.Element => {

  const onSubmit = () => {
    console.log('---')
  }
  const onChange = () => {
    console.log('---')
  }

  return(
    <div className={styles.main}>
      <form className={`${styles["main-form"]}`} onSubmit={onSubmit}>
        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
        <Input placeholder="Имя" extraClass="mb-6" name="name" value={''} onChange={onChange} />
        <EmailInput extraClass="mb-6" name="email" value={''} onChange={onChange} />
        <PasswordInput extraClass="mb-6" name="password" value={''} onChange={onChange} />
        <Button type="primary" extraClass="mb-20" htmlType="submit">Зарегистрироваться</Button>
        <p className="text text_type_main-default text_color_inactive mb-4">Уже зарегистрированы? <Link className="text_color_accent ml-2" to={'/login'}>Войти</Link></p>
      </form>
    </div>
  )
}