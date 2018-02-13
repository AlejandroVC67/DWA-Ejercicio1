export class JobModel {
  constructor (node, callback, onUpdate) {
    this.node = node
    this.callback = callback
    this.onUpdate = onUpdate
    this.elements = {}
    this.person = JSON.parse(window.sessionStorage.getItem('person'))
    this.elements.addButton = this.node.querySelector('.job__form__button')
    this.setButtonAction(this.elements.addButton)
    this.elements.changeState = document.querySelectorAll('.job__information-button')
    this.setChangeStateButton(this.elements.changeState)
    this.elements.jobContainer = document.querySelectorAll('.job')
    this.setJobContainerAction()
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
      this.person.Person[1].jobs.push(this.elements.newJob)
      window.sessionStorage.removeItem('person')
      window.sessionStorage.setItem('person', JSON.stringify(this.person))
      console.log(this.person)
      this.callback(this.person)
      this.node.classList.remove('job__form--active')
    })
  }

  setChangeStateButton (buttons) {
    buttons.forEach(element => {
      element.addEventListener('click', () => {
        const index = Array.from(buttons).indexOf(element)
        this.gridElement = document.querySelectorAll('.grid__element')[index]
        this.state = this.gridElement.getAttribute('data-category')
        this.updateState()
        this.url = this.gridElement.querySelector('.job__image').src
        this.jobTitle = this.gridElement.querySelectorAll('.job__information')[0].innerText.split(':')[1]
        this.deadline = this.gridElement.querySelectorAll('.job__information')[1].innerText.split(':')[1]
        this.updatedJob = {
          'title': this.jobTitle,
          'url': this.url,
          'status': this.state,
          'deadline': this.deadline
        }
        // this.gridElement.parentNode.removeChild(this.gridElement)
        this.updateJob()
        this.person.Person[1].jobs.push(this.updatedJob)
        window.sessionStorage.removeItem('person')
        window.sessionStorage.setItem('person', JSON.stringify(this.person))
        this.onUpdate(this.person)
      })
    })
  }

  updateState () {
    if (this.state === 'pending') {
      this.state = 'done'
      this.gridElement.dataset.category = this.state
    } else if (this.state === 'done') {
      this.state = 'pending'
      this.gridElement.dataset.category = this.state
    }
  }

  updateJob () {
    this.person.Person[1].jobs.forEach(element => {
      if (element.url === this.updatedJob.url) {
        const oldValueIndex = this.person.Person[1].jobs.indexOf(element)
        this.person.Person[1].jobs.splice(oldValueIndex, 1)
      }
    })
  }

  setJobContainerAction () {
    this.elements.jobContainer.forEach(element => {
      element.addEventListener('click', () => {
      })
    })
  }
}
