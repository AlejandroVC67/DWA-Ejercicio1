// import { Test } from './components/test.js'
import { NavBar } from './components/NavBar/NavBar.js'
import DataRetriever from './model/common/DataRetriever.js'
import { Grid } from './components/Grid/Grid.js'
import { JobModel } from './model/Job/Job.js'
const URL = 'https://api.myjson.com/bins/12na3h'
DataRetriever.get(URL, (data) => {
  // console.log(data)
  // console.log(data[0].Person[1].jobs)
  const categories = []
  data[0].Person[1].jobs.forEach(element => {
    if (!categories.includes(element.status)) {
      categories.push(element.status)
    }
  })
  function onChange (currentCategory) {
    // console.log(currentCategory)
    grid.updateGrid(currentCategory)
  }
  /* eslint-disable */
  new NavBar(document.querySelector('.nav-bar'), categories, onChange)
  const grid = new Grid(document.querySelector('.grid'))
  new Grid(document.querySelector('.grid'))  
  new JobModel(document.querySelector('.job__form'), onCreate)
  /* eslint-enable */
  function onCreate (person, newJob) {
    // console.log(person[1].jobs)
    // console.log(person)
    // console.log(newJob)
    // console.log(person.Person[1].jobs.push(newJob))
    // console.log(person)
    person.Person[1].jobs.push(newJob)
    grid.updateJobs(person)
    DataRetriever.postJob(URL, person, data, (updatedPerson) => {
        // console.log(data)
      // grid.updateJobs(updatedPerson)
    })
  }
})
