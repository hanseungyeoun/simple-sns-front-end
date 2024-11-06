import classNames from "classnames";
import { Link } from "react-router-dom";

export default function Pagination({
  currentPage, size, totalCount, totalPages, onChange
}) {
  let pages = [];
  let firstNumber = 0;
  let lastNumber = 0;
  let next = 0;
  let prev = 0;

  let pageGroup = Math.ceil((currentPage) / size)
  lastNumber = pageGroup * size
  if (lastNumber > totalPages) {
    lastNumber = totalPages
  }
  firstNumber = lastNumber - (size - 1)

  if (firstNumber < 1) {
    firstNumber = 1;
  }

  next = lastNumber + 1;
  prev = firstNumber - 1;

  pages = [];
  for (let i = firstNumber; i <= lastNumber; i++) {
    pages.push(i)
  }
  return (
    <>
      <ul className="pagination-list">
        <li className="pagination-item prev"><button onClick={() => onChange(prev)}>이전</button></li>
        {
          pages.map(page => {
            return <li key={page} className="pagination-item" onClick={() => onChange(page)}>
              <Link key={page} className={classNames("pagination-link", page === currentPage && 'is-active')} href="#">{page}</Link></li>
          })
        }
        <li className="pagination-item next"><button onClick={() => onChange(next)}>다음</button></li>
      </ul>
    </>
  )
}

