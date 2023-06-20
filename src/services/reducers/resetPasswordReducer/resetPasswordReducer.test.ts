import { FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from "../../action/actionTypes";
import { initialState, resetPasswordReducer } from "./resetPasswordReducer";

describe("resetPasswordReducer", () => {
  it('Вернет начальное состояние', () => {
    expect(
      resetPasswordReducer(initialState, {
        type: '',
        status: {
          message: ""
        },
        error: undefined
      })
      ).toEqual({
        status: null,
        forgotRequest: false,
        fargotSuccess: false,
        forgotFailed: false,
        resetRequest: false,
        resetSuccess: false,
        resetFailure: false
    })
  });
  it('Должен верно обработать FORGOT_PASSWORD_REQUEST', () => {
    expect(
      resetPasswordReducer(initialState, {
        type: FORGOT_PASSWORD_REQUEST,
        status: {
          message: ""
        },
        error: undefined
      })
      ).toEqual({
        fargotSuccess: false,
        forgotFailed: false,
        forgotRequest: true,
        resetFailure: false,
        resetRequest: false,
        resetSuccess: false,
        status: "Отправка данных",
    })
  });
  it('Должен верно обработать FORGOT_PASSWORD_SUCCESS', () => {
    expect(
      resetPasswordReducer(initialState, {
        type: FORGOT_PASSWORD_SUCCESS,
        status: {
          message: ""
        },
        error: false
      })
      ).toEqual({
        fargotSuccess: true,
        forgotFailed: false,
        forgotRequest: false,
        resetFailure: false,
        resetRequest: false,
        resetSuccess: false,
        status: "",
    })
  });
  it('Должен верно обработать FORGOT_PASSWORD_FAILED', () => {
    expect(
      resetPasswordReducer(initialState, {
        type: FORGOT_PASSWORD_FAILED,
        status: {
          message: "error"
        },
        error: "error"
      })
      ).toEqual({
        fargotSuccess: false,
        forgotFailed: true,
        forgotRequest: false,
        resetFailure: false,
        resetRequest: false,
        resetSuccess: false,
        status: "error",
    })
  });
  it('Должен верно обработать RESET_PASSWORD_REQUEST', () => {
    expect(
      resetPasswordReducer(initialState, {
        type: RESET_PASSWORD_REQUEST,
        status: {
          message: ""
        },
        error: false
      })
      ).toEqual({
        fargotSuccess: false,
        forgotFailed: false,
        forgotRequest: false,
        resetFailure: false,
        resetRequest: true,
        resetSuccess: false,
        status: 'Отправка данных',
    })
  });
  it('Должен верно обработать RESET_PASSWORD_SUCCESS', () => {
    expect(
      resetPasswordReducer(initialState, {
        type: RESET_PASSWORD_SUCCESS,
        status: {
          message: ""
        },
        error: false
      })
      ).toEqual({
        fargotSuccess: false,
        forgotFailed: false,
        forgotRequest: false,
        resetFailure: false,
        resetRequest: false,
        resetSuccess: true,
        status: '',
    })
  });
  it('Должен верно обработать RESET_PASSWORD_FAILED', () => {
    expect(
      resetPasswordReducer(initialState, {
        type: RESET_PASSWORD_FAILED,
        status: {
          message: "error"
        },
        error: "error"
      })
      ).toEqual({
        fargotSuccess: false,
        forgotFailed: false,
        forgotRequest: false,
        resetFailure: true,
        resetRequest: false,
        resetSuccess: false,
        status: "error",
    })
  });
});