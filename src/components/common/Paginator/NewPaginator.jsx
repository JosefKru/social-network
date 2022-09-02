import React from 'react'
import './style.css'
import classNames from 'classnames'

const range = (start, end) => {
  return [...Array(end).keys()].map((item) => item + start)
}

const PaginationItem = ({ page, currentPage, onPageChanged }) => {
  const liClasses = classNames({
    'page-item': true,
    active: page === currentPage,
  })
  return (
    <li className={liClasses} onClick={() => onPageChanged(page)}>
      <span className="page-link">{page}</span>
    </li>
  )
}

const NewPaginator = ({
  currentPage,
  totalUsersCount,
  pageSize,
  onPageChanged,
}) => {
  const pagesCount = Math.ceil(totalUsersCount / pageSize)

  const pages = range(1, pagesCount)
  let slicedPages = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
    let curP = currentPage
    let curPF = curP - 4 < 0 ? 0 : curP - 4
    let curPL = curP + 3
    slicedPages = pages.slice(curPF, curPL)
  }
  console.log(slicedPages)
  return (
    <ul className="pagination">
      {slicedPages.map((page) => (
        <PaginationItem
          page={page}
          key={page}
          currentPage={currentPage}
          onPageChanged={onPageChanged}
        />
      ))}
    </ul>
  )
}

export default NewPaginator
