import { async } from 'regenerator-runtime'
import * as model from './model.js'
import { previewResults } from './viewResults.js'
import { previewPosts, setHash } from './previewPosts.js'
let data = model.state.post

const getAll = async function () {
  await model.getData()
}

const createResults = async function () {
  try {
    parent = document.querySelector('.results')
    // Get the data for it
    await getAll()
    const data = model.state.post

    // Create the UI
    await previewResults(data)
  } catch (err) {
    console.error(err)
  }
}

const createPosts = async function () {
  try {
    // Get Data
    await getAll()

    let hash = window.location.hash

    // Select all results and add eventListeners
    const parent = document.querySelector('.recipe')

    const results = document.querySelectorAll('.preview__link')

    results.forEach((result) => {
      result.addEventListener('click', function () {
        parent.innerHTML = ''
        previewPosts(result, model.state.post)
      })
    })
  } catch (err) {
    console.error(err)
  }
}

const init = async function () {
  await createResults()
  await createPosts()
}
init()
