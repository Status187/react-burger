import React from 'react';
import { AppHeader } from '../AppHeader/AppHeader';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { BurgerConstructorContext } from '../../services/appContext'
import styles from './App.module.css';
import { IDataState, IInitialState } from '../../types';

function App() {

  const URL = "https://norma.nomoreparties.space/api/ingredients ";

  const [data, setData] = React.useState({ 
    success: false,
    data: []
  });

  const initialState: IInitialState = { 
    success: false,
    data: []
  };

  function reducer(state: any, action: IDataState) {
    switch (action.type) {
      case "set":
        return { success: action.payload.success, data: action.payload.data };
      case "reset":
        return initialState 
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  };

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

  const [dataState, dataStateDispatcher] = React.useReducer(reducer, initialState, undefined);

  React.useEffect(() => {
    dataStateDispatcher({type: 'set', payload: data});
  },[data]);

  // React.useEffect(() => {console.log(dataState)}, [dataState])
  
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        {dataState.success && (
          <>
            <BurgerIngredients data={data.data}/>
            <BurgerConstructorContext.Provider value={{ dataState, dataStateDispatcher }}>
              <BurgerConstructor />
            </BurgerConstructorContext.Provider>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
