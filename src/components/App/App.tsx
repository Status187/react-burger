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
import { ForgotPassword } from '../../pages/ForgotPassword/ForgotPassword';
import { ResetPassword } from '../../pages/ResetPassword/ResetPassword';
import { Profile } from '../../pages/Profile/Profile';
import { ProfileEditor } from '../../pages/ProfileEditor/ProfileEditor';
import { FORGOT_ROUTE_URL, INGREDIENTS_ROUTE_URL, LOGIN_ROUTE_URL, NOT_FOUND_ROUTE_URL, ORIGIN_ROUTE_URL, PROFILE_ORDERS_ROUTE_URL, PROFILE_ROUTE_URL, REGISTER_ROUTE_URL, RESET_ROUTE_URL } from '../../constants';
import { ProfileOrders } from '../../pages/ProfileOrders/ProfileOrders';
import { ProtectedRoute } from '../ProtectedRouter/ProtectedRouter';
import { getUser } from '../../services/action/authAction';
import { getCookie } from '../../utils/cookie';
import { IngredientDetailsPage } from '../../pages/IngredientDetails/IngredientsDeteilsPage';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const backgroundLocation = location.state && location.state.background;
  
  React.useEffect(() => {
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');
    dispatch(loadIngredients())
    if (accessToken && refreshToken) {
      dispatch(getUser());
    }
  }, [dispatch]);

  const { success } = useSelector(getIngredients);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main>
        {success && (
          <Routes location={backgroundLocation || location}>
            <Route path={ORIGIN_ROUTE_URL} element={<div className={styles.main}><BurgerIngredients /><BurgerConstructor /></div> } />
            <Route path={LOGIN_ROUTE_URL} element={<ProtectedRoute onlyUnAuth element={<LoginPage />} />} />
            <Route path={REGISTER_ROUTE_URL} element={<ProtectedRoute onlyUnAuth element={<Register />} />} />
            <Route path={FORGOT_ROUTE_URL} element={<ProtectedRoute onlyUnAuth element={<ForgotPassword />} />} />
            <Route path={RESET_ROUTE_URL} element={<ProtectedRoute onlyUnAuth element={<ResetPassword  />} />} />

            {backgroundLocation && 
              <Route
                path={`${INGREDIENTS_ROUTE_URL}/:id`}
                element={<IngredientDetailsPage />}
              />}

            <Route path={PROFILE_ROUTE_URL} element={<Profile />} >
              <Route index={true} element={<ProfileEditor />} />
              <Route path={PROFILE_ORDERS_ROUTE_URL} element={<ProfileOrders />} />
              <Route path={NOT_FOUND_ROUTE_URL} element={<NotFound404 />} />
            </Route>
            
            <Route path={NOT_FOUND_ROUTE_URL} element={<NotFound404 />} />
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;
