import { previewResults } from './viewResults.js'
import icons from '../src/img/icons.svg'

export const btn = async function (
  paginationLimit,
  listItem,
  btnPrev,
  btnNext
) {
  const appendPageNumber = (index) => {
    const pageNumber = document.createElement('button')
    pageNumber.className = 'pagination-number'
    pageNumber.innerHTML = index
    pageNumber.setAttribute('page-index', index)
    pageNumber.setAttribute('aria-label', 'Page ' + index)

    paginationNumbers.appendChild(pageNumber)

    const getPaginationNumbers = () => {
      for (let i = 1; i <= pageCount; i++) {
        appendPageNumber(i)
      }
    }
  }

  const handleActivePageNumber = () => {
    document.querySelectorAll('.pagination-number').forEach((button) => {
      button.classList.remove('active')

      const pageIndex = Number(button.getAttribute('page-index'))
      if (pageIndex == currentPage) {
        button.classList.add('active')
      }
    })
  }

  const setCurrentPage = (pageNum) => {
    currentPage = pageNum

    handleActivePageNumber()

    const prevRange = (pageNum - 1) * paginationLimit
    const currRange = pageNum * paginationLimit

    listItem.forEach((item, index) => {
      item.classList.add('hidden')
      if (index >= prevRange && index < currRange) {
        item.classList.remove('hidden')
      }
    })
  }

  setCurrentPage(1)

  btnPrev.addEventListener('click', function () {
    setCurrentPage(currentPage - 1)
  })

  btnNext.addEventListener('click', function () {
    setCurrentPage(currentPage + 1)
  })

  document.querySelectorAll('.pagination-number').forEach((button) => {
    const pageIndex = Number(button.getAttribute('page-index'))

    if (pageIndex) {
      button.addEventListener('click', () => {
        setCurrentPage(pageIndex)
      })
    }
  })
}
