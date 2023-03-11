import React from 'react';
import { AppHeader } from '../AAppHeader/AppHeader';
import { BurgerConstructor } from '../BBurgerConstructor/BurgerConstructor';
import { BurgerIngredients } from '../BBurgerIngredients/BurgerIngredients';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
