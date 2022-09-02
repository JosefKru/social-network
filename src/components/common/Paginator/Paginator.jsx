import React, { useState } from 'react'
import styles from './style.module.css'
import cn from 'classnames'

const Paginator = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 10,
}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize)

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

  let portionCount = Math.ceil(pagesCount / portionSize)
  let [portionNumber, setPortionNumber] = useState(1)
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
  let rightPortionPageNumber = portionNumber * portionSize

  return (
    // <div>
    //   {slicedPages.map((p) => {
    //     return (
    //       <span
    //         className={currentPage === p ? styles.selectedPage : undefined}
    //         onClick={(e) => {
    //           onPageChanged(p)
    //         }}
    //       >
    //         {' ' + p}
    //       </span>
    //     )
    //   })}
    // </div>
    <div className={styles.paginator}>
      {portionNumber > 1 ? (
        <button onClick={() => setPortionNumber(portionNumber - 1)}>
          PREV{' '}
        </button>
      ) : (
        undefined
      )}

      {pages
        .filter((pageF) => {
          return (
            pageF >= leftPortionPageNumber && pageF <= rightPortionPageNumber
          )
        })
        .map((p) => {
          return (
            <span
              className={cn(styles.pageNumber, {
                [styles.selectedPage]: currentPage === p,
              })}
              key={p}
              onClick={() => {
                onPageChanged(p)
              }}
            >
              {p}
            </span>
          )
        })}

      {portionNumber < portionCount && (
        <button onClick={() => setPortionNumber(portionNumber + 1)}>
          NEXT{' '}
        </button>
      )}
    </div>
  )
}

export default Paginator
