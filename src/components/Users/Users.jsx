import React from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './User/User'
import style from './users.module.css'

const Users = (props) => {
  return (
    <div>
      <Paginator {...props} />
      <div className={style.container}>
        {props.users.map((user) => (
          <User
            key={user.id}
            followingInProgress={props.followingInProgress}
            unfollow={props.unfollow}
            follow={props.follow}
            user={user}
          />
        ))}
      </div>
    </div>
  )
}

export default Users
