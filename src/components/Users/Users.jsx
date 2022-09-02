import React, { useState } from 'react'
import NewPaginator from '../common/Paginator/NewPaginator'
import User from './User/User'

let Users = ({
  // currentPage,
  totalUsersCount,
  pageSize,
  onPageChanged,
  users,
  ...props
}) => {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div>
      <NewPaginator
        currentPage={currentPage}
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        onPageChanged={(page) => setCurrentPage(page)}
      />
      <div>
        {users.map((u) => (
          <User
            user={u}
            followingInProgress={props.followingInProgress}
            key={u.id}
            unfollow={props.unfollow}
            follow={props.follow}
          />
        ))}
      </div>
    </div>
  )
}

export default Users
