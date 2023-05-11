import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileEditor.module.css';
import { useSelector } from 'react-redux';
import { getAuth } from '../../services/selectors';
import { getUser } from '../../services/action/authAction';
import { useAppDispatch } from '../../services/store';
import { useForm } from '../../hooks/useForm';

export const ProfileEditor = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { name, email } = useSelector(getAuth);
  
  // const [state, setState] = React.useState({
  //   name: '',
  //   email: '',
  //   password: ''
  // });

  const {values, setValues, handleChange} = useForm({
    name: '',
    email: '',
    password: ''
  });

  React.useEffect(() => {
    dispatch(getUser());

    if (values.name && values.email) {
      setValues({...values, name: name, email: email})
    }
  }, [dispatch, name, email, values, setValues]);

  // React.useEffect(() => {
  //   dispatch(getUser());

  //   if (name && email) {
  //     setState({...state, name: name, email: email})
  //   }
  // }, [dispatch, name, email, state]);

  // const onChange = (e: { target: any; }) => {
  //   const target = e.target;
  //   const value = target.value;
  //   const name = target.name;

  //   setState({
  //     ...state,
  //     [name]: value
  //   })
  // };

  return(
    <div className={styles.main}>
      <div className={`${styles["main-form"]}`}>
        <Input extraClass="mb-6" name="name" placeholder="Имя" value={values.name} onChange={handleChange} icon="EditIcon" />
        <EmailInput extraClass="mb-6" name="email" value={values.email} onChange={handleChange} />
        <PasswordInput extraClass="mb-6" name="password" value={values.password} onChange={handleChange} icon="EditIcon" />
        <div>
          <Button type="primary" htmlType='reset'>Отмена</Button>
          <Button type="primary" extraClass="ml-5" htmlType='submit'>Сохранить</Button>
        </div>
      </div>
    </div>
  )
}