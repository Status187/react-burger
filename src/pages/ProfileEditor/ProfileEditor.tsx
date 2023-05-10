import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileEditor.module.css';
import { useSelector } from 'react-redux';
import { getAuth } from '../../services/selectors';
import { getUser } from '../../services/action/authAction';
import { useAppDispatch } from '../../services/store';

export const ProfileEditor = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { name, email } = useSelector(getAuth);
  
  const [state, setState] = React.useState({
    name: '',
    email: '',
    password: ''
  });

  React.useEffect(() => {
    dispatch(getUser());

    if (name && email) {
      setState({...state, name: name, email: email})
    }
  }, [dispatch, name, email, state]);

  const onChange = (e: { target: any; }) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setState({
      ...state,
      [name]: value
    })
  };

  return(
    <div className={styles.main}>
      <div className={`${styles["main-form"]}`}>
        <Input extraClass="mb-6" name="name" placeholder="Имя" value={state.name} onChange={onChange} icon="EditIcon" />
        <EmailInput extraClass="mb-6" name="email" value={state.email} onChange={onChange} />
        <PasswordInput extraClass="mb-6" name="password" value={state.password} onChange={onChange} icon="EditIcon" />
        <div>
          <Button type="primary" htmlType='reset'>Отмена</Button>
          <Button type="primary" extraClass="ml-5" htmlType='submit'>Сохранить</Button>
        </div>
      </div>
    </div>
  )
}