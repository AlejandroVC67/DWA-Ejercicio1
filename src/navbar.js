// import { Test } from './components/test.js'
import { NavBar } from './components/NavBar/NavBar.js'
import DataRetriever from './model/common/DataRetriever.js'
import { Grid } from './components/Grid/Grid.js'
const URL = 'https://api.myjson.com/bins/1bcj0x'
DataRetriever.get(URL, (data) => {
  const grid = new Grid(document.querySelector('.grid'), data)    
//   console.log(data.Person[1].jobs)
  const categories = []
  data.Person[1].jobs.forEach(element => {
    if (!categories.includes(element.status)) {
      categories.push(element.status)
    }
  })
  function onChange (currentCategory) {
    console.log(currentCategory)
    grid.updateGrid(currentCategory)
  }
  /* eslint-disable */
  new NavBar(document.querySelector('.nav-bar'), categories, onChange)
  
  /* eslint-enable */
})
