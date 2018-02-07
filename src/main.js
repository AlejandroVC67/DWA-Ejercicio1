import { Login } from './components/Login/login.js'
import { LoginModel } from './model/Login/login.js'
import DataRetriever from './model/Login/DataRetriever.js'
/* eslint-disable */
new Login(document.querySelector('.login'))

/* eslint-enable */
const URL = 'https://api.myjson.com/bins/gxoo9'
DataRetriever.get(URL, (data) => {
/* eslint-disable */
  new LoginModel(document.querySelector('.login'), data)
/* eslint-enable */
})
