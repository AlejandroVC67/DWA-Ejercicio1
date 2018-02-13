export class RegisterModel {
  constructor (node, data, onCreate) {
    this.node = node
    this.data = data
    this.onCreate = onCreate
    this.elements = {}
    this.elements.button = this.node.querySelector('.register__button')
    this.setButtonAction()
  }

  setButtonAction () {
    this.elements.button.addEventListener('click', () => {
      this.elements.inputs = this.node.querySelectorAll('.landing__input')
      this.elements.select = this.node.querySelector('.register__selected')
      if (this.verifyPassword(this.elements.inputs[1].value)) {
        this.elements.json = {
          'Person': [
            {
              'email': this.elements.inputs[0].value,
              'password': this.elements.inputs[1].value
            },
            {
              'jobs': [
                {
                  'title': this.elements.inputs[2].value,
                  'url': this.elements.inputs[3].value,
                  'status': 'pending',
                  'deadline': this.elements.inputs[4].value
                }
              ]
            }
          ]
        }
        this.onCreate(this.elements.json)
      } else {
        window.alert('Password should contain numbers or special characters')
      }
    })
  }
  verifyPassword (password) {
    const MINLENGTH = 8
    if (password.length >= MINLENGTH && /(?=.*[0-9])/.exec(password) && /(?=.*[!@#$%^&*])/.exec(password)) {
      return true
    } else {
      return false
    }
  }
}
