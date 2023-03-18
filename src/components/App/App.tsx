import React from 'react';
import { AppHeader } from '../AppHeader/AppHeader';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { BurgerConstructorContext, reducer } from '../../services/appContext'
import styles from './App.module.css';
import { IInitialState } from '../../types';
import { URL_MAIN as URL} from '../../ constants';

function App(): JSX.Element {

  const [data, setData] = React.useState({ 
    success: false,
    data: []
  });

  const initialState: IInitialState = { 
    success: false,
    data: []
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
