import { NavigateFunction } from "react-router-dom";
import { PROFILE_ROUTE_URL } from "../../constants";
import { apiRequest, refreshToken } from "../../utils/api";
import { setCookie, deleteCookie, getCookie } from "../../utils/cookie";
import { AppDispatch } from "../store";
import { CLEAR_STATE, EDIT_USER_AUTH_FAILED, EDIT_USER_AUTH_REQUEST, EDIT_USER_AUTH_SUCCESS, GET_USER_AUTH_FAILED, GET_USER_AUTH_REQUEST, GET_USER_AUTH_SUCCESS, LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILED, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTRATION_FAILED, REGISTRATION_REQUEST, REGISTRATION_SUCCESS } from "./actionTypes";

export const userRegistration = (name: string, email: string, password: string) => (dispatch: AppDispatch) => {

  const options = {
    method: 'POST',
    body: JSON.stringify({
      "email": email,
      "password": password,
      "name": name
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  dispatch({
    type: REGISTRATION_REQUEST
  });

  apiRequest('auth/register', options)
    .then((res) => {
      const accessToken = res.accessToken.split("Bearer ")[1];
      const refreshToken = res.refreshToken;
      if (accessToken) {
        setCookie("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      }
      dispatch({
        type: REGISTRATION_SUCCESS,
        user: res.user
      })
      setCookie('accessToken', res.accessToken);
      setCookie('refreshToken', res.refreshToken);
    })
    .catch(error => {
      if (typeof (error) !== 'object') {
        dispatch({
          type: REGISTRATION_FAILED,
          error
        })
      } else {
        dispatch({
          type: REGISTRATION_FAILED,
          error: 'Ошибка регистрации'
        })
      }

    })
};

export const clearState = () => ({ type: CLEAR_STATE });

export const authlogin = (email: string, password: string | number, navigator: NavigateFunction) => (dispatch: AppDispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      "email": email,
      "password": password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  dispatch({ type: LOGIN_REQUEST });

  apiRequest('auth/login', options)
    .then(res => {
      const accessToken = res.accessToken.split("Bearer ")[1];
      const refreshToken = res.refreshToken;
      if (accessToken) {
        setCookie("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      }
      dispatch({ type: LOGIN_SUCCESS, user: res.user });
      setCookie('accessToken', res.accessToken);
      setCookie('refreshToken', res.refreshToken);
    })
    .then(() => navigator(PROFILE_ROUTE_URL, { replace: true }))
    .catch(status => {
      dispatch({
        type: LOGIN_FAILED,
        status
      });
    })
};

export const logout = () => (dispatch: AppDispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      "token": getCookie('refreshToken')
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  dispatch({ type: LOGOUT_REQUEST });

  apiRequest('auth/logout', options)
    .then((res) => {
      dispatch({ type: LOGOUT_SUCCESS, res });
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
    })
    .catch(error => {
      dispatch({
        type: LOGOUT_FAILED,
        error
      });
    });
};

export const getUser = () => (dispatch: AppDispatch) => {
  const options: {
    method: string;
    headers: {
      'Content-Type': string;
      authorization?: string;
    };
  } = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': getCookie('accessToken')
    },
  };

  dispatch({
    type: GET_USER_AUTH_REQUEST
  })

  apiRequest('auth/user', options)
    .then((res) => {
      dispatch({
        type: GET_USER_AUTH_SUCCESS,
        user: res.user
      })
    })
    .catch(error => {
      if (error === 'jwt expired') {
        refreshToken()
      } else {
        dispatch({ type: GET_USER_AUTH_FAILED })
      }
    })
};

export const updateUser = (form: { email: string; }) => (dispatch: AppDispatch) => {
  const options: {
    method: string;
    headers: {
      'Content-Type': string;
      Authorization?: string;
    };
    body: string;
  } = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie("accessToken")
    },
    body: JSON.stringify(form)
  };

  dispatch({ type: EDIT_USER_AUTH_REQUEST });

  apiRequest('auth/user', options)
    .then(({ user }) => {
      dispatch({ type: EDIT_USER_AUTH_SUCCESS, user })
    })
    .catch(error => {
      if (error === 'jwt expired') {
        refreshToken()
          .then(() => dispatch(updateUser(form)))
      } else {
        dispatch({ type: EDIT_USER_AUTH_FAILED, error })
      }
    });
};
