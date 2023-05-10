import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST, 
  FORGOT_PASSWORD_SUCCESS, 
  FORGOT_PASSWORD_FAILED
} from '../action/actionTypes';

const initialState = {
  status: null,
  forgotRequest: false,
  fargotSuccess: false,
  forgotFailed: false,
  resetRequest: false,
  resetSuccess: false,
  resetFailure: false
}

export const resetPasswordReducer = (state = initialState, action: { type: any; status: { message: any; }; error: any; }) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        status: 'Отправка данных',
        forgotRequest: true,
        fargotSuccess: false,
        forgotFailed: false
      }
    }

    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        status: action.status.message,
        forgotRequest: false,
        fargotSuccess: true,
        forgotFailed: false
      }
    }

    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        status: action.error,
        forgotRequest: false,
        fargotSuccess: false,
        forgotFailed: true
      }
    }
    
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        status: 'Отправка данных',
        resetRequest: true,
        resetFailure: false
      }
    }

    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        status: action.status.message,
        resetSuccess: true,
        resetRequest: false,
        resetFailure: false
      }
    }

    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        status: action.error,
        resetRequest: false,
        resetSuccess: false,
        resetFailure: true
      }
    }
    
    default:
      return state;
  }
}