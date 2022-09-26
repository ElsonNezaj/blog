export const state = {
  post: {},
}

export const getData = async function () {
  const data = await fetch('http://localhost:3000/posts')
  const res = await data.json()

  state.post = res
}
