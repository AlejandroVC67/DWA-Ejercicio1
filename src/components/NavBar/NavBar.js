import './mainNav.scss'
import data from '../../Data/data.json'
import template from './nav-bar.pug'

export class NavBar {
  constructor (node) {
    this.node = node
    this.elements = {}
    this.generateHTML()
    this.elements.menu = this.node.querySelector('.nav-bar__menu__button')
    this.elements.displayer = this.node.querySelector('.nav-bar__list')
    this.elements.dropDown = this.node.querySelectorAll('.nav-bar__list-container')
    this.elements.dropDownList = this.node.querySelectorAll('.nav-bar__dropdown-list')
    this.setMenuAction(this.elements.menu, this.elements.displayer)
    this.setDropDownAction(this.elements.dropDown, this.elements.dropDownList)
    this.currentDropdown = null
  }

  generateHTML () {
    this.node.innerHTML = template(data)
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

  setMenuAction (buttonMenu, itemsDisplayer) {
    buttonMenu.addEventListener('click', () => {
      this.animateMenu()
      itemsDisplayer.classList.toggle('nav-bar__list--active')
    })
  }

  animateMenu () {
    this.elements.firstArrow = this.node.querySelector('.nav-bar__menu__button-first')
    this.elements.lastArrow = this.node.querySelector('.nav-bar__menu__button-last')
    this.elements.firstArrow.classList.toggle(NavBar.states.firstArrowActive)
    this.elements.lastArrow.classList.toggle(NavBar.states.lastArrowActive)
  }

  setDropDownAction (dropDownTrigger) {
    dropDownTrigger.forEach(element => {
      element.addEventListener('click', () => {
        const index = Array.from(dropDownTrigger).indexOf(element)
        this.changeArrows(element, index)
        if (this.currentDropdown === null) {
          this.currentDropdown = index
        }
        if (index === this.currentDropdown) {
          this.elements.dropDownList[this.currentDropdown].classList.toggle(NavBar.states.dropDownActive)
        } else {
          this.elements.dropDownList[this.currentDropdown].classList.remove(NavBar.states.dropDownActive)
          this.elements.dropDownList[index].classList.add(NavBar.states.dropDownActive)
          this.currentDropdown = index
        }
      })
    })
  }

  changeArrows (element, index) {
    element.querySelectorAll('.nav-bar__arrow-container-item')[0].classList.toggle(NavBar.states.leftArrowActive)
    element.querySelectorAll('.nav-bar__arrow-container-item')[1].classList.toggle(NavBar.states.rightArrowActive)
  }
}
