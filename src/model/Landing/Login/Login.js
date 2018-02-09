export class LoginModel {
  constructor (node, data) {
    this.node = node
    this.data = data
    this.elements = {}
    console.log(this.data)
    this.elements.input = this.node.querySelectorAll('.login__form__input')
    this.elements.button = this.node.querySelector('.login__form__button')
    this.setButtonAction()
  }

  setButtonAction () {
    this.elements.button.addEventListener('click', () => {
      const email = this.elements.input[0].value
      const password = this.elements.input[1].value
      // console.log(email)
      // console.log(password)
      this.data.forEach(element => {
        if (element.Person[0].email === email && element.Person[0].password === password) {
          this.verifyPassword(this.elements.input[1].value, element.Person)
        }
      })
    })
  }

  verifyPassword (password, person) {
    const MINLENGTH = 8
    console.log(person)
    if (password.length >= MINLENGTH && /(?=.*[0-9])/.exec(password) && /(?=.*[!@#$%^&*])/.exec(password)) {
      window.sessionStorage.setItem('person', JSON.stringify(person))
      window.location.href = './app.html'
    } else {
      window.alert('Password should contain numbers or special characters')
    }
  }
}
