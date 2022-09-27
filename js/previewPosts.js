import { async } from 'regenerator-runtime'

export const previewPosts = async function (result, item) {
  try {
    parentEl = document.querySelector('.recipe')

    // Find object based on id (hash/href)
    const res = result.getAttribute('href')
    const i = item.find((d) => `#${d.id}` === res)

    html = `
    <figure class="recipe__fig">
    <img src="${i.imageUrl}" alt="Tomato" class="recipe__img" />
    <h1 class="recipe__title">
    <span>${i.title}</span>
    </h1>
    </figure>
    
    <div class="recipe__details">
    <div class="recipe__info">
    <span class="recipe__info-data recipe__info-data--minutes"
    >Author :
    </span>
    <span class="recipe__info-text">${i.author}</span>
          </div>
          <div class="recipe__info">
            <span class="recipe__info-data recipe__info-data--people"
              >Keywords :</span
              >
            <span class="recipe__info-text">${i.keywords}</span>
            </div>
            <div class="recipe__info">
            <span class="recipe__info-data recipe__info-data--people"
            >Date :</span
            >
            <span class="recipe__info-text">${i.createdAt}</span>
            </div>
            </div>
            
            <div class="recipe__directions">
            <div class="text">
            <h2 class="heading--2">Content:</h2>
            <p class="recipe__directions-text">${i.content}</p>
          </div>
          
          <div class="form">
          <form class="form_update">
              <input type="text" class="form_title title" value="${i.title}" />
              <input type="text" class="form_title author" value="${i.author}" />
              <textarea class="form_text content">${i.content}</textarea>
              <input type="text" class="form_title link" value="Image Link" />
              <button  class="submit_btn" value="Update">Update</button>
              </form>
              </div>
              </div>
              </div>
              </div>
              `

    parentEl.insertAdjacentHTML('afterbegin', html)

    const form = document.querySelector('.form_update')

    form.addEventListener('submit', function (e) {
      e.preventDefault()
      const title = document.querySelector('.title').value
      const author = document.querySelector('.author').value
      const content = document.querySelector('.content').value
      const link = document.querySelector('.link').value

      const dataToSubmit = {
        title: title,
        author: author,
        content: content,
        imageUrl: link,
        keywords: i.keywords,
        createdAt: i.createdAt,
      }

      fetch(`http://localhost:3000/posts/${i.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      })

      console.log(dataToSubmit)
    })
  } catch (err) {
    console.error(err)
  }
}
