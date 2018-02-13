// import { Test } from './components/test.js'
import { NavBar } from './components/NavBar/NavBar.js'
import DataRetriever from './model/common/DataRetriever.js'
import { Grid } from './components/Grid/Grid.js'
import { JobModel } from './model/Job/Job.js'
const URL = 'https://api.myjson.com/bins/kn72t'
DataRetriever.get(URL, (data) => {
  const categories = []
  data[0].Person[1].jobs.forEach(element => {
    if (!categories.includes(element.status)) {
      categories.push(element.status)
    }
  })
  /* eslint-disable */
  new NavBar(document.querySelector('.nav-bar'), categories, onChange)
  const grid = new Grid(document.querySelector('.grid'))
  new JobModel(document.querySelector('.job__form'), onCreate, onUpdate)
  /* eslint-enable */
  function onChange (currentCategory) {
    this.currentCategory = currentCategory
    grid.updateGrid(currentCategory)
  }
  function onCreate (person, newJob) {
    person.Person[1].jobs.push(newJob)
    // grid.updateJobs(person)
    // grid.createGridElement(person)
    data.forEach(element => {
      if (element.Person[0].email === person.Person[0].email && element.Person[0].password === person.Person[0].password) {
        const index = data.indexOf(element)
        data.splice(index, 1, person)
      }
    })

    DataRetriever.postJob(URL, data, () => {
      grid.updateJobs(person)
      grid.updateGrid(this.currentCategory)
    })
  }

  function onUpdate (person) {
    data.forEach(element => {
      if (element.Person[0].email === person.Person[0].email && element.Person[0].password === person.Person[0].password) {
        const index = data.indexOf(element)
        data.splice(index, 1, person)
      }
    })
    DataRetriever.postJob(URL, data, () => {
    })
  }
})
