import React from 'react'
import { UserType } from '../../types/types'
import Paginator from '../common/Paginator/Paginator'
import User from './User/User'
import style from './users.module.css'

type PropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  users: Array<UserType>
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  followingInProgress: Array<number>
}

const Users: React.FC<PropsType> = ({
  totalUsersCount,
  pageSize,
  currentPage,
  onPageChanged,
  users,
  follow,
  unfollow,
  followingInProgress,
}) => {
  return (
    <div>
      <Paginator
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
      />
      <div className={style.container}>
        {users.map((user) => (
          <User
            key={user.id}
            followingInProgress={followingInProgress}
            unfollow={unfollow}
            follow={follow}
            user={user}
          />
        ))}
      </div>
    </div>
  )
}

export default Users
