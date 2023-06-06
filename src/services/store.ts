import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import rootReducer from './reducers';
import { socketMiddleware } from './socketMiddleware/socketMiddleware';
import { wsAllOrdersActions } from './action/allOrdersAction';
import { wsOrdersUserActions } from './action/userOrdersAction';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(socketMiddleware(wsAllOrdersActions))
    .concat(socketMiddleware(wsOrdersUserActions)),
  devTools: true
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;