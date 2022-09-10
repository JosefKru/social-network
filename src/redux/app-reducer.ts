import { getAuthMe } from './auth-reducer'

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'

let initialState = {
  initialized: false,
}

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      }

    default:
      return state
  }
}

export const initializedSuccess = () => ({
  type: INITIALIZED_SUCCESS,
})

// ==== thunk creators ====
export const initializeApp = () => async (dispatch: any) => {
  const promise = dispatch(getAuthMe())
  Promise.all([promise]).then(() => {
    dispatch(initializedSuccess())
  })
}

export default appReducer
