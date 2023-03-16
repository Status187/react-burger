import React from 'react';
import { AppHeader } from '../AppHeader/AppHeader';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { DataBurgerConstructor } from '../../services/appContext'
import styles from './App.module.css';

function App() {

  const URL = "https://norma.nomoreparties.space/api/ingredients ";

  const initialState = { 
    success: false,
    data: []
  } 

  function reducer(state: any, action: { type: any; payload: any; } | undefined) {
    switch (action?.type) {
      case "set":
        return { success: action?.payload.success, data: action?.payload.data };
      case "reset":
        return initialState 
      default:
        throw new Error(`Wrong type of action: ${action?.type}`);
    }
  }

  React.useEffect(() => {
    fetch(URL)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(json => dataStateDispatcher({type: 'set', payload: json}))
      .catch((error) => console.error(`"Что то пошло не так", ${error}`))
  }, []);

  const [dataState, dataStateDispatcher] = React.useReducer(reducer, initialState, undefined);
  React.useEffect(() => {console.log(dataState)},[dataState])

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        {dataState.success && (
          <>
            <DataBurgerConstructor.Provider value={{ dataState, dataStateDispatcher }}>
              <BurgerIngredients data={dataState.data}/>
              <BurgerConstructor data={dataState.data}/>
            </DataBurgerConstructor.Provider>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
