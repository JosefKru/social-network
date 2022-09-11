import React from 'react'
import styles from './style.module.css'

type PropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (pageNumber: number) => void
}

const Paginator: React.FC<PropsType> = ({
  totalUsersCount,
  pageSize,
  currentPage,
  onPageChanged,
}) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize)

  // импровизированный пагинатор
  let pages = []
  let slicedPages: Array<number> = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
    let curP = currentPage
    let curPF = curP - 4 < 0 ? 0 : curP - 4
    let curPL = curP + 3
    slicedPages = pages.slice(curPF, curPL)
  }

  return (
    <div className={styles.paginator}>
      {slicedPages.map((p) => {
        return (
          <span
            key={p}
            className={currentPage === p ? styles.selectedPage : styles.item}
            onClick={() => {
              onPageChanged(p)
            }}
          >
            {p}
          </span>
        )
      })}
    </div>
  )
}

export default Paginator
