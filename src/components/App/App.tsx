import React from 'react';
import { AppHeader } from '../AppHeader/AppHeader';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import styles from './App.module.css';

function App() {

  const URL = "https://norma.nomoreparties.space/api/ingredients ";

  const [data, setData] = React.useState({
    success: false,
    data: []}
  )

  React.useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(() => console.error("Что то пошло не так"))
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        {data.success && (
          <>
            <BurgerIngredients data={data.data}/>
            <BurgerConstructor data={data.data}/>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
