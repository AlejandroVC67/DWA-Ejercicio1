export class JobModel {
  constructor (node, callback, onUpdate) {
    this.node = node
    this.callback = callback
    this.onUpdate = onUpdate
    this.elements = {}
    this.person = JSON.parse(window.sessionStorage.getItem('person'))
    console.log(this.person, 'al inicio')
    this.elements.addButton = this.node.querySelector('.job__form__button')
    this.setButtonAction(this.elements.addButton)
    this.elements.changeState = document.querySelectorAll('.job__information-button')
    this.setChangeStateButton(this.elements.changeState)
    this.elements.jobContainer = document.querySelectorAll('.job')
    this.setJobContainerAction()
    this.setUpdateButtonAction()
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
      element.addEventListener('click', (e) => {
        e.stopPropagation()
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
        this.updateJob(this.updatedJob)
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

  updateJob (newJob) {
    console.log(newJob)
    this.person.Person[1].jobs.forEach(element => {
      if (element.url === newJob.url) {
        const oldValueIndex = this.person.Person[1].jobs.indexOf(element)
        this.person.Person[1].jobs.splice(oldValueIndex, 1)
      }
    })
  }

  setJobContainerAction () {
    this.elements.jobContainer.forEach(element => {
      element.addEventListener('click', () => {
        this.elements.jobUpdate = document.querySelector('.job__form-update')
        this.elements.jobUpdate.classList.add('job__form-update--active')
        const index = Array.from(this.elements.jobContainer).indexOf(element)
        this.gridElement = document.querySelectorAll('.grid__element')[index]
      })
    })
  }

  setUpdateButtonAction () {
    this.elements.updateButton = document.querySelector('.job__form__update-button')
    this.elements.updateButton.addEventListener('click', () => {
      this.newJobTitle = this.elements.jobUpdate.querySelectorAll('.job__form__update-input')[0].value
      this.newDeadline = this.elements.jobUpdate.querySelectorAll('.job__form__update-input')[1].value
      this.gridElement.querySelectorAll('.job__information')[0].innerText = 'TITLE:' + this.newJobTitle
      this.gridElement.querySelectorAll('.job__information')[1].innerText = 'DEADLINE:' + this.newDeadline
      this.updatedJob = {
        'url': this.gridElement.querySelector('.job__image').src,
        'title': this.newJobTitle,
        'status': this.state = this.gridElement.getAttribute('data-category'),
        'deadline': this.newDeadline
      }
      this.updateJob(this.updatedJob)
      this.person.Person[1].jobs.push(this.updatedJob)
      window.sessionStorage.removeItem('person')
      window.sessionStorage.setItem('person', JSON.stringify(this.person))
      this.elements.jobUpdate.classList.remove('job__form-update--active')
      this.onUpdate(this.person)
    })
  }
}
