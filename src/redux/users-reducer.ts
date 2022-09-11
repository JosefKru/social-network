import { usersAPI } from '../api/api'
import { UserType } from '../types/types'
import { updateObjectInArray } from '../utils/validators/object-helpers'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const FOLLOWING_IN_PROGRESS = 'FOLLOWING_IN_PROGRESS'

type InitialStateType = typeof initialState

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>, //array of users ids
}

const usersReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: true,
        }),
      }

    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: false,
        }),
      }

    case SET_USERS:
      return { ...state, users: action.users }

    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage }

    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.totalUsersCount }

    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching }

    case FOLLOWING_IN_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : [...state.followingInProgress.filter((id) => id !== action.userId)],
      }

    default:
      return state
  }
}

type FollowSuccessType = {
  type: typeof FOLLOW
  userId: number
}
type UnfollowSuccessType = {
  type: typeof UNFOLLOW
  userId: number
}
type SetUsersType = {
  type: typeof SET_USERS
  users: Array<UserType>
}
type SetCurrentPageType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}
type SetTotalUsersCountType = {
  type: typeof SET_TOTAL_USERS_COUNT
  totalUsersCount: number
}
type ToggleIsFetchingType = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
}
type ToggleFollowingProgressType = {
  type: typeof FOLLOWING_IN_PROGRESS
  isFetching: boolean
  userId: number
}

export const followSuccess = (userId: number): FollowSuccessType => ({
  type: FOLLOW,
  userId,
})
export const unfollowSuccess = (userId: number): UnfollowSuccessType => ({
  type: UNFOLLOW,
  userId,
})
export const setUsers = (users: Array<UserType>): SetUsersType => ({
  type: SET_USERS,
  users,
})
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
})
export const setTotalUsersCount = (
  totalUsersCount: number
): SetTotalUsersCountType => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount,
})
export const toggleIsFetching = (
  isFetching: boolean
): ToggleIsFetchingType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
})
export const toggleFollowingProgress = (
  isFetching: boolean,
  userId: number
): ToggleFollowingProgressType => ({
  type: FOLLOWING_IN_PROGRESS,
  isFetching,
  userId,
})

// ===== thunk creators =====
export const requestUsers =
  (page: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true))

    let data = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
  }

export const onPageChange =
  (pageNumber: number, pageSize: number) => async (dispatch: any) => {
    dispatch(setCurrentPage(pageNumber))
    dispatch(toggleIsFetching(true))

    let data = await usersAPI.getUsers(pageNumber, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
  }

export const follow = (userId: number) => async (dispatch: any) => {
  let apiMethod = usersAPI.follow.bind(usersAPI)
  let actionCreator = followSuccess

  followUnfolloFlow(dispatch, userId, apiMethod, actionCreator)
}

export const unfollow = (userId: number) => async (dispatch: any) => {
  let apiMethod = usersAPI.unfollow.bind(usersAPI)
  let actionCreator = unfollowSuccess

  followUnfolloFlow(dispatch, userId, apiMethod, actionCreator)
}

// ===== optimization function =====
const followUnfolloFlow = async (
  dispatch: any,
  userId: number,
  apiMethod: any,
  actionCreator: any
) => {
  dispatch(toggleFollowingProgress(true, userId))
  let data = await apiMethod(userId)
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId))
  }

  dispatch(toggleFollowingProgress(false, userId))
}

export default usersReducer
