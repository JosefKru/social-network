import { stopSubmit } from 'redux-form'
import { profileAPI } from '../api/api'
import { PhotosType, PostType, ProfileType } from '../types/types'
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from './redux-store'

const ADD_POST = 'profile/ADD-POST'
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'
const DELETE_POST = 'profile/DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'

export type InitialStateType = typeof initialState

let initialState = {
  posts: [
    {
      id: 1,
      message:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nulla est reprehenderit. Modi praesentium nisi voluptates perspiciatis neque dicta, temporibus iste fugiat consectetur nam voluptate aperiam debitis. Vitae iste, architecto, culpa nisi adipisci dolores illum quia sapiente nihil illo magnam! Sapiente vero beatae culpa ut harum quae, cum quidem autem officiis odio molestias illum unde vitae recusandae laudantium perspiciatis repellendus asperiores esse eveniet ',
      likesCount: 12,
    },
    { id: 2, message: 'Моё сердце рзбито, но у мня есть клей', likesCount: 11 },
    {
      id: 3,
      message:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nulla est reprehenderit. Modi praesentium nisi',
      likesCount: 11,
    },
    {
      id: 4,
      message: 'Йа думаю эт сциальная сеть еще слишком слаба..',
      likesCount: 11,
    },
  ] as Array<PostType>,
  newPostText: '',
  profile: null as ProfileType | null,
  status: '',
}

const profileReducer = (
  state = initialState,
  action: ActionsTypes
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

// ==== types ====
type ActionsTypes =
  | AddPostActiontype
  | SetUserProfileActionType
  | SetStatusActionType
  | DeletePostActionType
  | SavePhotoSuccessActionType

type AddPostActiontype = {
  type: typeof ADD_POST
  newPostText: string
}
type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE
  profile: ProfileType
}
type SetStatusActionType = {
  type: typeof SET_STATUS
  status: string
}
type DeletePostActionType = {
  type: typeof DELETE_POST
  postId: number
}
type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS
  photos: PhotosType
}

// ==== action creators ====
export const addPost = (newPostText: string): AddPostActiontype => ({
  type: ADD_POST,
  newPostText,
})
export const setUserProfile = (
  profile: ProfileType
): SetUserProfileActionType => ({
  type: SET_USER_PROFILE,
  profile,
})
export const setStatus = (status: string): SetStatusActionType => ({
  type: SET_STATUS,
  status,
})
export const deletePost = (postId: number): DeletePostActionType => ({
  type: DELETE_POST,
  postId,
})
export const savePhotoSuccess = (
  photos: PhotosType
): SavePhotoSuccessActionType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
})

// ==== thunk creators ====
type ThunkTypes = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>
export const getProfile =
  (userId: number): ThunkTypes =>
  async (dispatch) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
  }

export const getStatus =
  (userId: number): ThunkTypes =>
  async (dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
  }

export const updateStatus =
  (status: string): ThunkTypes =>
  async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status))
    }
  }

export const savePhoto =
  (file: any): ThunkTypes =>
  async (dispatch) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
      dispatch(savePhotoSuccess(response.data.data.photos))
    }
  }

export const saveProfile =
  (profileData: ProfileType): ThunkTypes =>
  async (dispatch: any, getState: any) => {
    const response = await profileAPI.saveProfile(profileData)
    const userId = getState().auth.userId
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
