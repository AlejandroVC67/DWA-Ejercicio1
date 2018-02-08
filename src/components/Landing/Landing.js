export class Landing {
  constructor (node) {
    this.node = node
    this.elements = {}
    this.elements.buttons = this.node.querySelectorAll('.landing__button')
    this.setButtonsActions()
  }
  setButtonsActions () {
    this.elements.buttons.forEach(element => {
      element.addEventListener('click', this.showSection.bind(this))
    })
  }
  showSection (event) {
    const section = event.currentTarget.innerText
    console.log(section)
    if (section === 'SIGN UP') {
      document.querySelector('.register').classList.toggle('register--active')
    }
    if (section === 'LOGIN') {
      document.querySelector('.login').classList.toggle('login--active')
    }
  }
}
