import React from 'react'
import style from '../users.module.css'
import userPhoto from '../../../assets/images/user.png'
import { NavLink } from 'react-router-dom'

const User = ({ user, followingInProgress, unfollow, follow }) => {
  return (
    <div className={style.item}>
      <div>
        <NavLink to={'/profile/' + user.id}>
          <img
            src={user.photos.small ? user.photos.small : userPhoto}
            className={style.userPhoto}
            alt="Аватар"
          />
        </NavLink>
      </div>
      {user.followed ? (
        <button
          className={style.itemBtnUnfollow}
          disabled={followingInProgress.some((id) => id === user.id)}
          onClick={() => {
            unfollow(user.id)
          }}
        >
          Unfollow
        </button>
      ) : (
        <button
          className={style.itemBtnFollow}
          disabled={followingInProgress.some((id) => id === user.id)}
          onClick={() => {
            follow(user.id)
          }}
        >
          Follow
        </button>
      )}
      <span>
        <span>
          <div className={style.itemName}>{user.name}</div>
          <div className={style.itemStatus}>{user.status}</div>
        </span>
      </span>
    </div>
  )
}

export default User
