import { IAuthReducer, IInitialStateAuth } from '../../../types';
import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  GET_USER_AUTH_REQUEST,
  GET_USER_AUTH_SUCCESS,
  GET_USER_AUTH_FAILED,
  EDIT_USER_AUTH_REQUEST,
  EDIT_USER_AUTH_SUCCESS,
  EDIT_USER_AUTH_FAILED,
  CLEAR_STATE
} from '../../action/actionTypes';

export const initialState: IInitialStateAuth = {
  user: {
    email: '',
    name: '',
  },
  status: null,
  registerRequest: false,
  registerSuccess: false,
  registerFailure: false,
  loginRequest: false,
  loginFailure: false,
  logoutRequest: false,
  logoutFailed: false,
  getUserRequest: false,
  getUserFailure: false,
  editUserRequest: false,
  editUserSuccess: false,
  editUserFailure: false,
};

export const authReducer = (state = initialState, action: IAuthReducer) => {
  switch (action.type) {
    case CLEAR_STATE: {
      return initialState;
    }
    case REGISTRATION_REQUEST: {
      return {
        ...state,
        status: null,
        registerRequest: true,
        registerFailure: false
      }
    }

    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        status: 'Регистрация прошла успешно!',
        user: action.user,
        registerRequest: false,
        registerSuccess: true,
        registerFailure: false
      }
    }

    case REGISTRATION_FAILED: {
      return {
        ...state,
        status: action.error,
        registerRequest: false,
        registerSuccess: false,
        registerFailure: true
      }
    }

    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginFailure: false
      }
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.user,
        loginRequest: false,
        loginFailure: false
      }
    }

    case LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailure: true,
        status: action.status
      }
    }

    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutFailure: false,
      }
    }

    case LOGOUT_SUCCESS: {
      return {
        ...state,
        user: {
          email: '',
          name: '',
        },
        status: action.res.message,
        logoutRequest: false,
        logoutFailure: false,
      }
    }

    case LOGOUT_FAILED: {
      return {
        ...state,
        status: action.message,
        logoutRequest: false,
        logoutFailure: true,
      }
    }

    case GET_USER_AUTH_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserFailure: false
      }
    }

    case GET_USER_AUTH_SUCCESS: {
      return {
        ...state,
        user: action.user,
        getUserRequest: false,
        getUserFailure: false
      }
    }

    case GET_USER_AUTH_FAILED: {
      return {
        ...state,
        status: action.error,
        getUserRequest: false,
        getUserFailure: true
      }
    }

    case EDIT_USER_AUTH_REQUEST: {
      return {
        ...state,
        editUserRequest: true,
        editUserFailure: false
      }
    }

    case EDIT_USER_AUTH_SUCCESS: {
      return {
        ...state,
        user: action.user,
        editUserRequest: false,
        editUserSuccess: true,
        editUserFailure: false
      }
    }

    case EDIT_USER_AUTH_FAILED: {
      return {
        ...state,
        editUserRequest: false,
        editUserFailure: true
      }
    }

    default:
      return state;
  }
};
