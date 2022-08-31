import React from 'react'
import styles from './style.module.css'

const Paginator = ({
  totalUsersCount,
  pageSize,
  currentPage,
  onPageChanged,
}) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize)

  // импровизированный пагинатор
  let pages = []
  let slicedPages = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
    let curP = currentPage
    let curPF = curP - 4 < 0 ? 0 : curP - 4
    let curPL = curP + 3
    slicedPages = pages.slice(curPF, curPL)
  }

  return (
    <div>
      {slicedPages.map((p) => {
        return (
          <span
            className={currentPage === p ? styles.selectedPage : undefined}
            onClick={(e) => {
              onPageChanged(p)
            }}
          >
            {' ' + p}
          </span>
        )
      })}
    </div>
  )
}

export default Paginator
