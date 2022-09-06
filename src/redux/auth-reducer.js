import { stopSubmit } from 'redux-form'
import { authAPI, securityAPI } from './../api/api'

const SET_USER_DATA = 'auth/SET_USER_DATA'
const GET_CAPTCHA_URL = 'auth/GET_CAPTCHA_URL'

let initialState = {
  id: null,
  login: null,
  email: null,
  isAuth: false,
  captchaUrl: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      }
    case GET_CAPTCHA_URL:
      return {
        ...state,
        captchaUrl: action.captchaUrl,
      }

    default:
      return state
  }
}

export const setAuthUserData = (id, login, email, isAuth) => ({
  type: SET_USER_DATA,
  payload: { id, login, email, isAuth },
})
export const getCaptchaUrl = (captchaUrl) => ({
  type: GET_CAPTCHA_URL,
  captchaUrl,
})

// ==== thunk creators ====
export const getAuthMe = () => async (dispatch) => {
  const response = await authAPI.me()
  if (response.data.resultCode === 0) {
    let { id, login, email } = response.data.data
    dispatch(setAuthUserData(id, login, email, true))
  }
}

export const login = (email, password, rememberMe, captcha) => async (
  dispatch
) => {
  const response = await authAPI.login(email, password, rememberMe, captcha)
  if (response.data.resultCode === 0) {
    dispatch(getAuthMe())
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptcha())
    }
    let message =
      response.data.messages.length > 0
        ? response.data.messages[0]
        : 'Some error'
    dispatch(stopSubmit('login', { _error: message }))
  }
}

export const logout = () => async (dispatch) => {
  const response = await authAPI.logout()
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false))
  }
}

export const getCaptcha = () => async (dispatch) => {
  const response = await securityAPI.getCaptcha()
  const captchaUrl = response.data.url
  dispatch(getCaptchaUrl(captchaUrl))
}

export default authReducer
