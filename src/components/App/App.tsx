import React from 'react';
import { AppHeader } from '../AppHeader/AppHeader';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import styles from './App.module.css';
import { loadIngredients } from '../../services/action/ingredientsAction';
import { useAppDispatch } from '../../services/store';
import { useSelector } from 'react-redux';
import { getIngredients } from '../../services/selectors';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(loadIngredients())
  }, [dispatch]);

  const { success } = useSelector(getIngredients);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
          {success && (
            <>
              <BurgerIngredients />
              <BurgerConstructor />
            </>
          )}
      </main>
    </div>
  );
}

export default App;
