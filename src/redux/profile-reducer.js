import { profileAPI } from './../api/api'

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'

let initialState = {
  posts: [
    { id: 1, message: 'Фантасмагоричный чай', likesCount: 12 },
    { id: 2, message: "Oh boy is's my first trip", likesCount: 11 },
    { id: 3, message: 'Ччеееееееееееееееееееёёёёё', likesCount: 11 },
    { id: 4, message: 'Да-да', likesCount: 11 },
  ],
  newPostText: '',
  profile: null,
  status: '',
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      }
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: '',
      }
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      }
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      }
    }
    default:
      return state
  }
}

// ==== action creators ====
export const addPostActionCreator = (newPostText) => ({
  type: ADD_POST,
  newPostText,
})
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })

// ==== thunk creators ====
export const getProfile = (userId) => {
  return (dispatch) => {
    profileAPI.getProfile(userId).then((data) => {
      dispatch(setUserProfile(data))
    })
  }
}

export const getStatus = (userId) => {
  return (dispatch) => {
    profileAPI.getStatus(userId).then((response) => {
      dispatch(setStatus(response.data))
    })
  }
}

export const updateStatus = (status) => (dispatch) => {
  profileAPI.updateStatus(status).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status))
    }
  })
}

export default profileReducer
