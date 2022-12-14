import * as model from './model.js'
import { MODAL_CLOSE_SEC } from './config.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js'
import bookmarksView from './views/bookmarksView.js'
import addRecipeView from './views/addRecipeView.js'

import 'core-js/stable' // Polyfilling
import 'regenerator-runtime/runtime' // Polyfilling Async
import recipeView from './views/recipeView.js'
import { async } from 'regenerator-runtime'
import { render } from 'sass'

// if (module.hot) {
//   module.hot.accept()
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1)

    if (!id) return
    recipeView.renderSpinner()

    // Update results view to mark selected seach result
    resultsView.update(model.getSearchResultsPage())

    // LOADING THE RECIPE
    await model.loadRecipe(id)

    // RENDERING THE RECIPE
    recipeView.render(model.state.recipe)

    bookmarksView.render(model.state.bookmarks)
  } catch (err) {
    recipeView.renderError()
    console.error(err)
  }
}

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner()

    // 1. Get Search Query
    const query = searchView.getQuery()
    if (!query) return

    // 2. Load Search Query
    await model.loadSearchResults(query)

    // 3. Render Results

    // PAGINATION IMPLEMENTATION
    resultsView.render(model.getSearchResultsPage())

    // 4. Render the initial pagination buttons
    paginationView.render(model.state.search)
  } catch (err) {
    console.log(err)
  }
}

const controlPagination = function (goTo) {
  // 1. Render New Results

  // PAGINATION IMPLEMENTATION
  resultsView.render(model.getSearchResultsPage(goTo))

  // 2. Render new pagination buttons
  paginationView.render(model.state.search)

  console.log(goTo)
}

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings)

  // Update the recipe view
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}

const controlBookmarks = function () {
  // Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
  else model.removeBookmark(model.state.recipe.id)

  // Update recipe view
  recipeView.update(model.state.recipe)

  // Render Bookmarks
  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarksr = function () {
  bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async function (newRecipe) {
  try {
    // SHow loading spinner
    addRecipeView.renderSpinner()

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe)

    // Render Recipe
    recipeView.render(model.state.recipe)

    // Success Message
    addRecipeView.renderMessage()

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks)

    // Change ID in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`)

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindows()
    }, MODAL_CLOSE_SEC * 1000)
  } catch (err) {
    console.error('????', err)
    addRecipeView.renderError(err.message)
  }
}

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarksr)
  recipeView.addHandlerRender(controlRecipes)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(controlBookmarks)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
  addRecipeView.addHandlerUpload(controlAddRecipe)
}
init()
