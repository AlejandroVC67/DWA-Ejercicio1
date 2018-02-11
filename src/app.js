// import { Test } from './components/test.js'
import { NavBar } from './components/NavBar/NavBar.js'
import DataRetriever from './model/common/DataRetriever.js'
import { Grid } from './components/Grid/Grid.js'
import { JobModel } from './model/Job/Job.js'
const URL = 'https://api.myjson.com/bins/1b5tl9'
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
  new JobModel(document.querySelector('.job__form'), onCreate)
  /* eslint-enable */
  function onChange (currentCategory) {
    // console.log(currentCategory)
    this.currentCategory = currentCategory
    grid.updateGrid(currentCategory)
  }
  function onCreate (person, newJob) {
    person.Person[1].jobs.push(newJob)
    grid.updateJobs(person)
    DataRetriever.postJob(URL, person, data, (updatedPerson) => {
      grid.updateJobs(updatedPerson)
      grid.updateGrid(this.currentCategory)
    })
  }
})
