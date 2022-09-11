import { stopSubmit } from 'redux-form'
import { profileAPI } from '../api/api'
import { PhotosType, PostType, ProfileType } from '../types/types'

const ADD_POST = 'profile/ADD-POST'
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'
const DELETE_POST = 'profile/DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'

export type InitialStateType = typeof initialState

let initialState = {
  posts: [
    { id: 1, message: 'Фантасмагоричный чай', likesCount: 12 },
    { id: 2, message: "Oh boy is's my first trip", likesCount: 11 },
    { id: 3, message: 'Ччеееееееееееееееееееёёёёё', likesCount: 11 },
    { id: 4, message: 'Да-да, нет-нет', likesCount: 11 },
  ] as Array<PostType>,
  newPostText: '',
  profile: null as ProfileType | null,
  status: '',
}

const profileReducer = (
  state = initialState,
  action: any
): InitialStateType => {
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

    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      }

    default:
      return state
  }
}

// ==== action creators ====
type AddPostActiontype = {
  type: typeof ADD_POST
  newPostText: string
}
export const addPost = (newPostText: string): AddPostActiontype => ({
  type: ADD_POST,
  newPostText,
})

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE
  profile: ProfileType
}
export const setUserProfile = (
  profile: ProfileType
): SetUserProfileActionType => ({
  type: SET_USER_PROFILE,
  profile,
})

type SetStatusActionType = {
  type: typeof SET_STATUS
  status: string
}
export const setStatus = (status: string): SetStatusActionType => ({
  type: SET_STATUS,
  status,
})

type DeletePostActionType = {
  type: typeof DELETE_POST
  postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({
  type: DELETE_POST,
  postId,
})

type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS
  photos: PhotosType
}
export const savePhotoSuccess = (
  photos: PhotosType
): SavePhotoSuccessActionType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
})

// ==== thunk creators ====
export const getProfile = (userId: number) => async (dispatch: any) => {
  const response = await profileAPI.getProfile(userId)
  dispatch(setUserProfile(response.data))
}

export const getStatus = (userId: number) => async (dispatch: any) => {
  const response = await profileAPI.getStatus(userId)
  dispatch(setStatus(response.data))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
  const response = await profileAPI.updateStatus(status)
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status))
  }
}

export const savePhoto = (file: any) => async (dispath: any) => {
  const response = await profileAPI.savePhoto(file)
  if (response.data.resultCode === 0) {
    dispath(savePhotoSuccess(response.data.data.photos))
  }
}

export const saveProfile =
  (profileData: ProfileType) => async (dispatch: any, getState: any) => {
    const response = await profileAPI.saveProfile(profileData)
    const userId = getState().auth.id
    if (response.data.resultCode === 0) {
      dispatch(getProfile(userId))
    } else {
      let message =
        response.data.messages.length > 0
          ? response.data.messages[0]
          : 'Some error'

      let parseMessage = ''
      if (message.split(' ').includes('format')) {
        //импровизация
        parseMessage = message
          .split('->')[1]
          .split('')
          .slice(0, parseMessage.length - 1)
          .map((item: any, index: number) =>
            index === 0 ? item.toLowerCase() : item
          )
          .join('')
      }
      dispatch(
        stopSubmit('editProfile', { contacts: { [parseMessage]: message } })
      )
      return Promise.reject(message)
    }
  }

export default profileReducer
