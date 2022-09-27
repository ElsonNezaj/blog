import icons from '../src/img/icons.svg'

export const previewResults = async function (data) {
  const paginationLimit = 10

  const parentEl = document.querySelector('.results')
  const buttonEl = document.querySelector('.pagination')

  try {
    Array.from(data).map((d) => {
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
  } catch (err) {
    console.error(err)
  }
}
