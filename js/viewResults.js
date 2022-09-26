import icons from '../src/img/icons.svg'

export const previewResults = async function (data) {
  const paginationLimit = 10
  const listItems = document.querySelectorAll('.preview')
  const pageCount = Math.ceil(listItems.length / paginationLimit)
  let currentPage

  const parentEl = document.querySelector('.results')
  const buttonEl = document.querySelector('.pagination')

  try {
    data.map((d) => {
      html = `
            <li class="preview">
            <a class="preview__link " href="#${d.id}">
            <figure class="preview__fig">
            <img src="${d.imageUrl}" alt="Test" />
            </figure>
            <div class="preview__data">
            <h4 class="preview__title">${d.title}</h4>
            <p class="preview__publisher">${d.author}</p>
            </div>
            </a>
            </li>
            `
      parentEl.insertAdjacentHTML('afterbegin', html)
    })

    pagi = `
    <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
         
          </button>
          <button class="btn--inline pagination__btn--next">
         
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
    `
    buttonEl.insertAdjacentHTML('afterbegin', pagi)
  } catch (err) {
    console.error(err)
  }
}
