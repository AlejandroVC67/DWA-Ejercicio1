import './mainNav.scss'
import data from '../../Data/data.json'
import template from './nav-bar.pug'

export class NavBar {
  constructor (node, categories, callback) {
    this.node = node
    this.data = categories
    this.onChange = callback
    this.elements = {}
    this.generateHTML()
    this.currentFilter = 'All'
    this.elements.menu = this.node.querySelector('.nav-bar__menu__button')
    this.elements.displayer = this.node.querySelector('.nav-bar__list')
    this.setMenuAction(this.elements.menu, this.elements.displayer)
    this.elements.categories = this.node.querySelectorAll('.nav-bar__list__element-button')
    this.setCategoriesAction(this.elements.categories)
  }

  static get contentStructure () {
    return {
      dots: `<li class="nav-bar__list__element"><button class="nav-bar__list__element-button" data-category="{cat}">{cat}</button></li>`
    }
  }
  static get states () {
    return {
      firstArrowActive: `nav-bar__menu__button-first--active`,
      lastArrowActive: `nav-bar__menu__button-last--active`,
      dropDownActive: `nav-bar__dropdown-list--active`,
      leftArrowActive: `leftArrow--active`,
      rightArrowActive: `rightArrow--active`
    }
  }

  generateHTML () {
    this.node.innerHTML = template(data)
    this.elements.displayer = this.node.querySelector('.nav-bar__list')

    const categoriesArray = this.data.map(element => {
      return NavBar.contentStructure.dots.replace('{cat}', element).replace('{cat}', element)
    })
    this.elements.displayer.innerHTML += categoriesArray.join('')
  }

  setMenuAction (buttonMenu, itemsDisplayer) {
    buttonMenu.addEventListener('click', () => {
      this.animateMenu()
      this.hideGridElements()
      itemsDisplayer.classList.toggle('nav-bar__list--active')
    })
  }

  animateMenu () {
    this.elements.firstArrow = this.node.querySelector('.nav-bar__menu__button-first')
    this.elements.lastArrow = this.node.querySelector('.nav-bar__menu__button-last')
    this.elements.firstArrow.classList.toggle(NavBar.states.firstArrowActive)
    this.elements.lastArrow.classList.toggle(NavBar.states.lastArrowActive)
  }

  hideGridElements () {
    document.querySelectorAll('.grid__element').forEach(element => {
      element.classList.remove('grid__element--active')
    })
  }

  setCategoriesAction (categories) {
    categories.forEach(element => {
      element.addEventListener('click', this.getClickedElement.bind(this))
    })
  }

  getClickedElement (event) {
    this.hideGridElements()
    if (event.currentTarget !== this.currentFilter) {
      this.node.querySelector('.nav-bar__list__element-button--selected').classList.remove('nav-bar__list__element-button--selected')
      event.currentTarget.classList.add('nav-bar__list__element-button--selected')
      this.currentFilter = event.currentTarget.dataset.category
      this.elements.displayer.classList.toggle('nav-bar__list--active')
      // console.log(this.currentFilter)
      this.onChange(this.currentFilter)
    }
  }
}
