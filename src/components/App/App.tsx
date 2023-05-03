import React from 'react';
import { AppHeader } from '../AppHeader/AppHeader';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import styles from './App.module.css';
import { loadIngredients } from '../../services/action/ingredientsAction';
import { useAppDispatch } from '../../services/store';
import { useSelector } from 'react-redux';
import { getIngredients } from '../../services/selectors';
import { Routes, Route, useLocation } from 'react-router-dom';
import { NotFound404 } from '../../pages/NotFound/NotFound';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { Register } from '../../pages/Register/Register';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const locationState = useLocation();

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
                <Route path="/registration" element={<Register />} />
                {/* <Route path="/register" element={} /> */}
                {/* <Route path="/forgot-password" element={} /> */}
                {/* <Route path="/reset-password" element={} /> */}
                {/* <Route path="/profile" element={} /> */}
                {/* <Route path="/ingredients/:id" element={} /> */}
                <Route path="*" element={<NotFound404 />} />
                {/* <BurgerIngredients />
                <BurgerConstructor /> */}
              </Routes>
          )}
      </main>
    </div>
  );
}

export default App;
