import React from 'react';
import logo from '../../logo.svg';
import { AppHeader } from '../appHeader/AppHeader';
import { BurgerIngredients } from '../burgerIngredients/BurgerIngredients';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main>
        <BurgerIngredients />
      </main>
    </div>
  );
}

export default App;
