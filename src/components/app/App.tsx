import React from 'react';
import { AppHeader } from '../appHeader/AppHeader';
import { BurgerConstructor } from '../burgerConstructor/BurgerConstructor';
import { BurgerIngredients } from '../burgerIngredients/BurgerIngredients';
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
