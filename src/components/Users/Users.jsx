import React from 'react'
import axios from 'axios'

import styles from './users.module.css'
import userPhoto from '../../assets/images/user.png'
import { NavLink } from 'react-router-dom'

let Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

  let pages = []
  let slicedPages = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
    let curP = props.currentPage
    let curPF = curP - 4 < 0 ? 0 : curP - 4
    let curPL = curP + 3
    slicedPages = pages.slice(curPF, curPL)
  }

  return (
    <div>
      <div>
        {slicedPages.map((p) => {
          return (
            <span
              className={props.currentPage === p && styles.selectedPage}
              onClick={(e) => {
                props.onPageChanged(p)
              }}
            >
              {' ' + p}
            </span>
          )
        })}
      </div>
      {props.users.map((u) => (
        <div key={u.id}>
          <span>
            <div>
              <NavLink to={'/profile/' + u.id}>
                <img
                  src={u.photos.small != null ? u.photos.small : userPhoto}
                  className={styles.userPhoto}
                />
              </NavLink>
            </div>
            <div>
              {u.followed ? (
                <button
                  onClick={() => {
                    axios
                      .delete(
                        `https://social-network.samuraijs.com/api/1.0/follow/${
                          u.id
                        }`,
                        {
                          withCredentials: true,
                          headers: {
                            'API-KEY': 'ed294fca-808a-48e3-a814-9dd8d2b97cda',
                          },
                        }
                      )
                      .then((response) => {
                        if (response.data.resultCode === 0) {
                          props.unfollow(u.id)
                        }
                      })
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    axios
                      .post(
                        `https://social-network.samuraijs.com/api/1.0/follow/${
                          u.id
                        }`,
                        {},
                        {
                          withCredentials: true,
                          headers: {
                            'API-KEY': 'ed294fca-808a-48e3-a814-9dd8d2b97cda',
                          },
                        }
                      )
                      .then((response) => {
                        if (response.data.resultCode === 0) {
                          props.follow(u.id)
                        }
                      })
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{u.name}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{'u.location.country'}</div>
              <div>{'u.location.city'}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  )
}

export default Users
