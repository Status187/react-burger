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
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(json => setData(json))
      .catch((error) => console.error(`"Что то пошло не так", ${error}`))
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
