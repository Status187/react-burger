import { NavigateFunction } from "react-router-dom";
import { apiRequest } from "../../utils/api";
import { AppDispatch } from "../store";
import { FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from "./actionTypes";

export const getForgotPassword = (email: any, navigate: NavigateFunction) => (dispatch: AppDispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({ 'email': email }),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  dispatch({
    type: FORGOT_PASSWORD_REQUEST
  });
  
  apiRequest('password-reset', options)
    .then(status => dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      status
    }))
    .then(() => navigate('/reset-password', {replace: true}))
    .catch((error) => dispatch({
      type: FORGOT_PASSWORD_FAILED,
      error
    }))
};

export const postResetPassword = (password: any, emailCode: any, navigate: NavigateFunction) => (dispatch: AppDispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(  {
      "password": password,
      "token": emailCode
  }),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  dispatch({
    type: RESET_PASSWORD_REQUEST
  })

  apiRequest('password-reset/reset', options)
    .then(status => dispatch({
      type: RESET_PASSWORD_SUCCESS,
      status
    }))
    .then(() => navigate('/login', {replace: true}))
    .catch(error => dispatch({
      type: RESET_PASSWORD_FAILED,
      error
    }))

};