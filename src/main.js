import { Login } from './components/Landing/Login.js'
import { Register } from './components/Landing/Register.js'
import { Landing } from './components/Landing/Landing.js'
import { LoginModel } from './model/Login/Login.js'
import DataRetriever from './model/common/DataRetriever.js'
/* eslint-disable */
new Landing(document.querySelector('.landing'))
new Login(document.querySelector('.login'))
new Register(document.querySelector('.register'))
/* eslint-enable */
const URL = 'https://api.myjson.com/bins/gxoo9'
DataRetriever.get(URL, (data) => {
/* eslint-disable */
  new LoginModel(document.querySelector('.login'), data)
/* eslint-enable */
})
