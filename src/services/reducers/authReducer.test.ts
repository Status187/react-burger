import { CLEAR_STATE, EDIT_USER_AUTH_FAILED, EDIT_USER_AUTH_REQUEST, EDIT_USER_AUTH_SUCCESS, GET_USER_AUTH_FAILED, GET_USER_AUTH_REQUEST, GET_USER_AUTH_SUCCESS, LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILED, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTRATION_FAILED, REGISTRATION_REQUEST, REGISTRATION_SUCCESS } from "../action/actionTypes";
import { authReducer, initialState } from "./authReducer";

describe("authReducer", () => {
  it('Вернет начальное состояние', () => {
    expect(authReducer(initialState, {
      type: "",
      user: [],
      error: "",
      status: "",
      res: {
        message: ""
      },
      message: ""
    } )).toEqual(initialState)
  })

  it('Должен верно обработать CLEAR_STATE', () => {
    expect(
      authReducer(initialState, {
        type: CLEAR_STATE,
        user: [],
        error: "",
        status: "",
        res: {
          message: ""
        },
        message: ""
      })
    ).toEqual(initialState)
  })
  it('Должен верно обработать REGISTRATION_REQUEST', () => {
    expect(
      authReducer(initialState, {
        type: REGISTRATION_REQUEST,
        user: [],
        error: "",
        status: "",
        res: {
          message: ""
        },
        message: ""
      })
    ).toEqual(expect.objectContaining({
        status: null,
        registerRequest: true,
        registerFailure: false
    }))
  })
  it('Должен верно обработать REGISTRATION_SUCCESS', () => {
    expect(
      authReducer(initialState, {
        type: REGISTRATION_SUCCESS,
        user: [],
        error: "",
        status: "",
        res: {
          message: ""
        },
        message: ""
      })
    ).toEqual(expect.objectContaining({
      status: 'Регистрация прошла успешно!',
      registerRequest: false,
      registerSuccess: true,
      registerFailure: false
    }))
  })
  it('Должен верно обработать REGISTRATION_FAILED', () => {
    expect(
      authReducer(initialState, {
        type: REGISTRATION_FAILED,
        user: [],
        error: "",
        status: "",
        res: {
          message: ""
        },
        message: ""
      })
    ).toEqual(expect.objectContaining({
      registerRequest: false,
      registerSuccess: false,
      registerFailure: true
    }))
  })
  it('Должен верно обработать LOGIN_REQUEST', () => {
    expect(
      authReducer(initialState, {
        type: LOGIN_REQUEST,
        user: [],
        error: "",
        status: "",
        res: {
          message: ""
        },
        message: ""
      })
    ).toEqual(expect.objectContaining({
      loginRequest: true,
      loginFailure: false
    }))
  })
  it('Должен верно обработать LOGIN_SUCCESS', () => {
    expect(
      authReducer(initialState, {
        type: LOGIN_SUCCESS,
        user: [],
        error: "",
        status: "",
        res: {
          message: ""
        },
        message: ""
      })
    ).toEqual(expect.objectContaining({
      loginRequest: false,
      loginFailure: false
    }))
  })
  it('Должен верно обработать LOGIN_FAILED', () => {
    expect(
      authReducer(initialState, {
        type: LOGIN_FAILED,
        user: [],
        error: "",
        status: "",
        res: {
          message: ""
        },
        message: ""
      })
    ).toEqual(expect.objectContaining({
      loginRequest: false,
      loginFailure: true,
    }))
  })
  it('Должен верно обработать LOGOUT_REQUEST', () => {
    expect(
      authReducer(initialState, {
        type: LOGOUT_REQUEST,
        user: [],
        error: "",
        status: "",
        res: {
          message: ""
        },
        message: ""
      })
    ).toEqual(expect.objectContaining({
      logoutRequest: true,
      logoutFailure: false,
    }))
  })
  it('Должен верно обработать LOGOUT_SUCCESS', () => {
    expect(
      authReducer(initialState, {
        type: LOGOUT_SUCCESS,
        user: [],
        error: "",
        status: "",
        res: {
          message: ""
        },
        message: ""
      })
    ).toEqual(expect.objectContaining({
      user: {
        email: '',
        name: '',
      },
      logoutRequest: false,
      logoutFailure: false,
    }))
  })
  it('Должен верно обработать LOGOUT_FAILED', () => {
    expect(
      authReducer(initialState, {
        type: LOGOUT_FAILED,
        user: [],
        error: "",
        status: "",
        res: {
          message: ""
        },
        message: ""
      })
    ).toEqual(expect.objectContaining({
      logoutRequest: false,
      logoutFailure: true,
    }))
  })
  it('Должен верно обработать GET_USER_AUTH_REQUEST', () => {
    expect(
      authReducer(initialState, {
        type: GET_USER_AUTH_REQUEST,
        user: [],
        error: "",
        status: "",
        res: {
          message: ""
        },
        message: ""
      })
    ).toEqual(expect.objectContaining({
      getUserRequest: true,
      getUserFailure: false
    }))
  })
  it('Должен верно обработать GET_USER_AUTH_SUCCESS', () => {
    expect(
      authReducer(initialState, {
        type: GET_USER_AUTH_SUCCESS,
        user: [],
        error: "",
        status: "",
        res: {
          message: ""
        },
        message: ""
      })
    ).toEqual(expect.objectContaining({
      getUserRequest: false,
      getUserFailure: false
    }))
  })
  it('Должен верно обработать GET_USER_AUTH_FAILED', () => {
    expect(
      authReducer(initialState, {
        type: GET_USER_AUTH_FAILED,
        user: [],
        error: "",
        status: "",
        res: {
          message: ""
        },
        message: ""
      })
    ).toEqual(expect.objectContaining({
      getUserRequest: false,
      getUserFailure: true
    }))
  })
  it('Должен верно обработать EDIT_USER_AUTH_REQUEST', () => {
    expect(
      authReducer(initialState, {
        type: EDIT_USER_AUTH_REQUEST,
        user: [],
        error: "",
        status: "",
        res: {
          message: ""
        },
        message: ""
      })
    ).toEqual(expect.objectContaining({
      editUserRequest: true,
      editUserFailure: false
    }))
  })
  it('Должен верно обработать EDIT_USER_AUTH_SUCCESS', () => {
    expect(
      authReducer(initialState, {
        type: EDIT_USER_AUTH_SUCCESS,
        user: [],
        error: "",
        status: "",
        res: {
          message: ""
        },
        message: ""
      })
    ).toEqual(expect.objectContaining({
      editUserRequest: false,
      editUserSuccess: true,
      editUserFailure: false
    }))
  })
  it('Должен верно обработать EDIT_USER_AUTH_FAILED', () => {
    expect(
      authReducer(initialState, {
        type: EDIT_USER_AUTH_FAILED,
        user: [],
        error: "",
        status: "",
        res: {
          message: ""
        },
        message: ""
      })
    ).toEqual(expect.objectContaining({
      editUserRequest: false,
      editUserFailure: true
    }))
  })
});