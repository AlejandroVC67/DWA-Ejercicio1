// import { Test } from './components/test.js'
import { NavBar } from './components/NavBar/NavBar.js'
import DataRetriever from './model/common/DataRetriever.js'
import { Grid } from './components/Grid/Grid.js'
const URL = 'https://api.myjson.com/bins/vkl1d'
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

  /* eslint-enable */
})
