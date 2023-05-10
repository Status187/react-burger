import React from 'react';
import { AppHeader } from '../AppHeader/AppHeader';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import styles from './App.module.css';
import { loadIngredients } from '../../services/action/ingredientsAction';
import { useAppDispatch } from '../../services/store';
import { useSelector } from 'react-redux';
import { getIngredients } from '../../services/selectors';
import { Routes, Route } from 'react-router-dom';
import { NotFound404 } from '../../pages/NotFound/NotFound';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { Register } from '../../pages/Register/Register';
import { ForgotPassword } from '../../pages/ForgotPassword/ForgotPassword';
import { ResetPassword } from '../../pages/ResetPassword/ResetPassword';
import { Profile } from '../../pages/Profile/Profile';
import { ProfileEditor } from '../../pages/ProfileEditor/ProfileEditor';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(loadIngredients())
  }, [dispatch]);

  const { success } = useSelector(getIngredients);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main>
        {success && (
          <Routes>
            <Route path="/" element={<div className={styles.main}><BurgerIngredients /><BurgerConstructor /></div> } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/profile" element={<Profile />} />
              <Route element={<ProfileEditor />} />
            {/* <Route path="/ingredients/:id" element={} /> */}
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;
