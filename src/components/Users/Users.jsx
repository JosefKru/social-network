import React from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './User/User'

const Users = (props) => {
  return (
    <div>
      <Paginator {...props} />
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
  )
}

export default Users
