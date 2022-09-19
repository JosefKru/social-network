import { stopSubmit } from 'redux-form'
import { authAPI, securityAPI } from '../api/api'

const SET_USER_DATA = 'auth/SET_USER_DATA'
const GET_CAPTCHA_URL = 'auth/GET_CAPTCHA_URL'

export type InitialStateType = typeof initialState

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
}

const authReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
        hye: 'hyeu', // ????????????????
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

// ==== thunk creators ====
type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA
  payload: SetAuthUserDataActionPayloadType
}
type SetAuthUserDataActionPayloadType = {
  id: number | null
  login: string | null
  email: string | null
  isAuth: boolean
}
type GetCaptchaUrlActionType = {
  type: typeof GET_CAPTCHA_URL
  captchaUrl: string
}

// ==== action creators ====
export const setAuthUserData = (
  id: number | null,
  login: string | null,
  email: string | null,
  isAuth: boolean
): SetAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: { id, login, email, isAuth },
})
export const getCaptchaUrl = (captchaUrl: string): GetCaptchaUrlActionType => ({
  type: GET_CAPTCHA_URL,
  captchaUrl,
})

// ==== thunk creators ====
export const getAuthMe = () => async (dispatch: any) => {
  const response = await authAPI.me()
  if (response.data.resultCode === 0) {
    let { id, login, email } = response.data.data
    dispatch(setAuthUserData(id, login, email, true))
  }
}

export const login =
  (email: string, password: string, rememberMe: boolean, captcha: any) =>
  async (dispatch: any) => {
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

export const logout = () => async (dispatch: any) => {
  const response = await authAPI.logout()
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false))
  }
}

export const getCaptcha = () => async (dispatch: any) => {
  const response = await securityAPI.getCaptcha()
  const captchaUrl = response.data.url
  dispatch(getCaptchaUrl(captchaUrl))
}

export default authReducer
