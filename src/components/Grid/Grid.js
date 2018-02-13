import './mainGrid.scss'

export class Grid {
  constructor (node) {
    this.node = node
    this.person = JSON.parse(window.sessionStorage.getItem('person'))
    // console.log(this.person.Person[1].jobs)
    this.jobs = this.person.Person[1].jobs
    // console.log(this.jobs)
    // console.log(this.data)
    this.elements = {}
    this.createGridElement(this.node)
    this.elements.gridElements = this.node.querySelectorAll('.grid__element')
    this.showAllCategories(this.elements.gridElements, 'All')
  }

  static get contentStructure () {
    return {
      gridElement: (`<div class="grid__element" data-category="{cat}">
                        <div class="job">
                            <img class="job__image" src="{src}" alt="">
                            <div class="job__information-container">
                                <p class="job__information">Title: {title} </p>
                                <p class="job__information">Deadline: {deadline}</p>
                                <button class="job__information-button">Change State</button>
                            </div>
                        </div>
                    </div>`)
    }
  }

  static get states () {
    return {
      gridElementActive: (`grid__element--active`)
    }
  }

  createGridElement (grid) {
    const jobsArray = this.jobs.map(element => {
      return Grid.contentStructure.gridElement
        .replace('{src}', element.url)
        .replace('{title}', element.title)
        .replace('{cat}', element.status)
        .replace('{deadline}', element.deadline)
    })
    grid.innerHTML = jobsArray.join('')
  }

  updateJobs (updatedData) {
    this.person = updatedData
    console.log(this.node)
    const jobsArray = this.person.Person[1].jobs.map(element => {
      return Grid.contentStructure.gridElement
         .replace('{src}', element.url)
         .replace('{title}', element.title)
         .replace('{cat}', element.status)
         .replace('{deadline}', element.deadline)
    })
    this.node.innerHTML = jobsArray.join('')
    this.showAllCategories(document.querySelectorAll('.grid__element'))
  }

  updateGrid (categorySelected) {
    if (categorySelected === 'All') {
      this.showAllCategories(this.elements.gridElements)
    } else {
      this.showSpecificCategory(categorySelected, this.elements.gridElements)
    }
  }

  showAllCategories (gridElements) {
    gridElements.forEach(function (element) {
      element.classList.add(Grid.states.gridElementActive)
    })
  }

  showSpecificCategory (categorySelected, gridElements) {
    gridElements.forEach(element => {
      if (element.dataset.category !== categorySelected) {
        element.classList.remove(Grid.states.gridElementActive)
      } else {
        element.classList.add(Grid.states.gridElementActive)
      }
    })
  }
}
