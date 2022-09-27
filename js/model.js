export const state = {
  post: {},
  pagination: {
    page: 1,
    resultsPerPage: 10,
  },
}

export const getData = async function () {
  const data = await fetch('http://localhost:3000/posts')
  const res = await data.json()

  state.post = res
}

// PAGINATION IMPLEMENTATION
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page

  const start = (page - 1) * state.search.resultsPerPage //0
  const end = page * state.search.resultsPerPage //9

  return state.search.results.slice(start, end)
}
