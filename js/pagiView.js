import { previewResults } from './viewResults.js'
import icons from '../src/img/icons.svg'

export const btn = async function (
  // Jepi funksionit parametrat qe i duhen per pagination
  paginationLimit,
  listItem,
  btnPrev,
  btnNext
) {
  // Krijo button page number per cdo page button
  const appendPageNumber = (index) => {
    // Krijo nje buton me te dhena ekzakte si me poshte
    const pageNumber = document.createElement('button')
    pageNumber.className = 'pagination-number'
    pageNumber.innerHTML = index
    pageNumber.setAttribute('page-index', index)
    pageNumber.setAttribute('aria-label', 'Page ' + index)

    // Append butonin ne container
    paginationNumbers.appendChild(pageNumber)

    // Krijo nga nje buton per cdo page
    const getPaginationNumbers = () => {
      for (let i = 1; i <= pageCount; i++) {
        appendPageNumber(i)
      }
    }
  }

  // Krijo nje funksion i cili do te beje aktive current page
  const handleActivePageNumber = () => {
    document.querySelectorAll('.pagination-number').forEach((button) => {
      button.classList.remove('active')

      // Merr index nga buton dhe nese esht e barabarte me current page beje aktive
      const pageIndex = Number(button.getAttribute('page-index'))
      if (pageIndex == currentPage) {
        button.classList.add('active')
      }
    })
  }

  // Krijo nje funksion per te vendosur current page
  const setCurrentPage = (pageNum) => {
    // Beje te barabarte me parametrin e funksionit
    currentPage = pageNum

    // Therrit funksionin per active page
    handleActivePageNumber()

    // Llogarit range e items per cdo page
    const prevRange = (pageNum - 1) * paginationLimit
    const currRange = pageNum * paginationLimit

    // Nese index-i i nje item ne liste eshte within range, beje visible ( te tjerat beji hide )
    listItem.forEach((item, index) => {
      item.classList.add('hidden')
      if (index >= prevRange && index < currRange) {
        item.classList.remove('hidden')
      }
    })
  }

  // Therrit funksionin e setCurrentPage ne main ose global scope
  setCurrentPage(1)

  // Ne klikim te previous button , zbrit 1 nga currentPage
  btnPrev.addEventListener('click', function () {
    setCurrentPage(currentPage - 1)
  })

  // Ne klikim te next button , shtoi 1 currentPage
  btnNext.addEventListener('click', function () {
    setCurrentPage(currentPage + 1)
  })

  // Per cdo page number button , shtoi nje event listener e cila do te shfaqi current page me index e saj
  document.querySelectorAll('.pagination-number').forEach((button) => {
    const pageIndex = Number(button.getAttribute('page-index'))

    if (pageIndex) {
      button.addEventListener('click', () => {
        setCurrentPage(pageIndex)
      })
    }
  })
}
