import type { Middleware, MiddlewareAPI } from 'redux';
import { refreshToken } from '../../utils/api';
import { AppDispatch, RootState } from '../store';
import { AppActions, wsActionsTypes } from '../../types';
import { getCookie } from '../../utils/cookie';

export function getEventMessage(e: Event) {
  if (e instanceof ErrorEvent) {
    return e.message;
  } else if (e instanceof CloseEvent) {
    return `${e.code} ${e.reason}`;
  }
  return `Ошибка ${e.type}: ${JSON.stringify(e, Object.getOwnPropertyNames(e))}`;
}

export const socketMiddleware = (wsActions: wsActionsTypes): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let ReconnectWs = 0;
    let ConnectedWs = false;
    let url = '';

    return next => (action: AppActions) => {
      const { dispatch } = store;

      if (action.type === wsActions.onStart) {
        url = action.url;

        if (action.addToken) {
          const token = getCookie('accessToken')?.split("Bearer ")[1]
          url += `?token=${token}`;
        }
        let current = 0;
        while (current < 10) {
          try { 
            socket = new WebSocket(url);
            break;
          } catch {
            current++;
          }
        }
        
        ConnectedWs = true;
        window.clearTimeout(ReconnectWs);
        dispatch({ type: wsActions.onSuccess });
      }
      if (socket) {
        socket.onopen = () => {
          dispatch({ type: wsActions.onOpen });
        };

        socket.onclose = event => {
          if (event.code !== 1000) {
            dispatch({ type: wsActions.onError, error: getEventMessage(event) });
            socket?.close();
          }
          if (ConnectedWs) {
            dispatch({ type: wsActions.onClosed });
            ReconnectWs = window.setTimeout(() => {
              dispatch({ type: wsActions.onStart, url: url });
            }, 3000)
          }
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          if (!parsedData?.success) {
            if (parsedData?.message === 'Недействительный или отсутствующий токен') {
              refreshToken();
            }
            dispatch({ type: wsActions.onError, error: parsedData?.message });
          } else {
            const { success, ...restParsedData } = parsedData;
            dispatch({ type: wsActions.onMessage, message: restParsedData });
          }
        };

        socket.onerror = event => {
          dispatch({ type: wsActions.onError, error: getEventMessage(event) });
        };

        if (action.type === wsActions.onEnd) {
          window.clearTimeout(ReconnectWs);
          ConnectedWs = false;
          ReconnectWs = 0;
          socket.close();
          dispatch({ type: wsActions.onClosed });
        }
      }
      next(action);
    };
  };
};
