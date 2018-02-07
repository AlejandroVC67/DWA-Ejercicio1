export class LoginModel {
  constructor (node, data) {
    this.node = node
    this.data = data
    console.log(this.data.Person[0].email)
    console.log(this.data.Person[0].password)
    this.elements = {}
    this.elements.input = this.node.querySelectorAll('.login__form__input')
    this.elements.button = this.node.querySelector('.login__form__button')
    this.setButtonAction()
  }

  setButtonAction () {
    this.elements.button.addEventListener('click', () => {
      const email = this.elements.input[0].value
      const password = this.elements.input[1].value
      if (this.data.Person[0].email === email && this.data.Person[0].password === password) {
        this.verifyPassword(this.elements.input[1].value)
      } else {
        window.alert('nop')
      }
    })
  }

  verifyPassword (password) {
    const MINLENGTH = 8
    if (password.length >= MINLENGTH && /(?=.*[0-9])/.exec(password) && /(?=.*[!@#$%^&*])/.exec(password)) {
      window.location.href = './app.html'
    } else {
      console.log('no cumple las reglas')
    }
  }
}
