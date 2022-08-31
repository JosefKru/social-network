import { profileAPI } from './../api/api'

const ADD_POST = 'profile/ADD-POST'
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'
const DELETE_POST = 'profile/DELETE_POST'

let initialState = {
  posts: [
    { id: 1, message: 'Фантасмагоричный чай', likesCount: 12 },
    { id: 2, message: "Oh boy is's my first trip", likesCount: 11 },
    { id: 3, message: 'Ччеееееееееееееееееееёёёёё', likesCount: 11 },
    { id: 4, message: 'Да-да, нет-нет', likesCount: 11 },
  ],
  newPostText: '',
  profile: null,
  status: '',
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
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

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      }

    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      }

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.postId),
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
export const deletePost = (postId) => ({ type: DELETE_POST, postId: postId })

// ==== thunk creators ====
export const getProfile = (userId) => async (dispatch) => {
  let response = await profileAPI.getProfile(userId)
  dispatch(setUserProfile(response.data))
}

export const getStatus = (userId) => async (dispatch) => {
  let response = await profileAPI.getStatus(userId)
  dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
  let response = await profileAPI.updateStatus(status)
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status))
  }
}

export default profileReducer
