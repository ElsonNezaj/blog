import View from './view.js'
import icons from 'url:../../img/icons.svg'

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload')
  _message = 'Recipe was successfully uploaded'

  _window = document.querySelector('.add-recipe-window')
  _overlay = document.querySelector('.overlay')
  _btnOpenWindow = document.querySelector('.nav__btn--add-recipe')
  _btnCloseWindow = document.querySelector('.btn--close-modal')

  constructor() {
    super()
    this._addHandlerShowWindows()
    this._addHandlerHideWindows()
  }

  toggleWindows() {
    this._overlay.classList.toggle('hidden')
    this._window.classList.toggle('hidden')
  }

  _addHandlerShowWindows() {
    this._btnOpenWindow.addEventListener('click', this.toggleWindows.bind(this))
  }

  _addHandlerHideWindows() {
    this._btnCloseWindow.addEventListener(
      'click',
      this.toggleWindows.bind(this)
    )
    this._overlay.addEventListener('click', this.toggleWindows.bind(this))
  }

  addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault()
      const dataArr = [...new FormData(this)]
      const data = Object.fromEntries(dataArr)
      handler(data)
    })
  }

  _generateMarkup() {}
}

export default new AddRecipeView()
