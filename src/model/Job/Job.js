export class JobModel {
  constructor (node, callback) {
    this.node = node
    this.callback = callback
    this.elements = {}
    this.person = JSON.parse(window.sessionStorage.getItem('person'))
    this.elements.addButton = this.node.querySelector('.job__form__button')
    this.setButtonAction(this.elements.addButton)
    this.elements.changeState = document.querySelectorAll('.job__information-button')
    this.setChangeStateButton(this.elements.changeState)
    // console.log(this.jobs)
  }

  setButtonAction (button) {
    button.addEventListener('click', () => {
      this.elements.inputs = this.node.querySelectorAll('.job__form__input')
      this.elements.newJob = {
        'title': this.elements.inputs[0].value,
        'url': this.elements.inputs[1].value,
        'status': 'pending',
        'deadline': this.elements.inputs[2].value
      }
      this.callback(this.person, this.elements.newJob)
      this.node.classList.remove('job__form--active')
    })
  }

  setChangeStateButton (buttons) {
    buttons.forEach(element => {
      element.addEventListener('click', () => {
        const index = Array.from(buttons).indexOf(element)
        this.gridElement = document.querySelectorAll('.grid__element')[index]
        this.state = this.gridElement.getAttribute('data-category')
        this.updateJob()
        this.url = this.gridElement.querySelector('.job__image').src
        this.jobTitle = this.gridElement.querySelectorAll('.job__information')[0].innerText.split(':')[1]
        // this.realTitle = this.jobTitle.split(':')[1]
        this.deadline = this.gridElement.querySelectorAll('.job__information')[1].innerText.split(':')[1]
        // this.realDeadline = this.deadline.split(':')[1]
        this.updatedJob = {
          'title': this.jobTitle,
          'url': this.url,
          'status': this.state,
          'deadline': this.deadline
        }
        console.log(this.updatedJob)
      })
    })
  }

  updateJob () {
    if (this.state === 'pending') {
      this.state = 'done'
      this.gridElement.dataset.category = this.state
    } else if (this.state === 'done') {
      this.state = 'pending'
      this.gridElement.dataset.category = this.state
    }
  }
}
