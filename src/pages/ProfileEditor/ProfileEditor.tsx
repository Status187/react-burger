import * as React from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ProfileEditor.module.css';
import { getAuth } from '../../services/selectors';
import { updateUser } from '../../services/action/authAction';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useForm } from '../../hooks/useForm';
import { IInitialStateAuth } from '../../types';

export const ProfileEditor = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { user }: IInitialStateAuth = useAppSelector(getAuth);

  const submitForm = React.useCallback((values: { email: string; }) => {
    dispatch(updateUser(values))
  }, [dispatch]);

  const {values, setValues, handleChange, onSubmit} = useForm({
    name: user.name,
    email: user.email,
    password: ''
  }, submitForm);


  React.useEffect(() => {
    if (values.email === '') {
      setValues({
        name: user.name,
        email: user.email,
        password: user.password
      })
    }
  }, [setValues, user, values])

  const onReset = React.useCallback((e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setValues({ name: user.name, email: user.email, password: user.password});
  }, [setValues, user.email, user.name, user.password]);

  return (
    <form className={`${styles["main-form"]}`} onSubmit={onSubmit} onReset={onReset}>
      <Input extraClass="mb-6" name="name" placeholder="Имя" value={values.name as string} onChange={handleChange} icon="EditIcon" />
      <EmailInput extraClass="mb-6" name="email" value={values.email} onChange={handleChange} />
      <PasswordInput extraClass="mb-6" name="password" value={values.password as string} onChange={handleChange} icon="EditIcon" />
      <div>
        <Button type="primary" htmlType='reset'>Отмена</Button>
        <Button type="primary" extraClass="ml-5" htmlType='submit'>Сохранить</Button>
      </div>
    </form>
  )
}