import { Login } from './components/Landing/Login/Login.js'
import { LoginModel } from './model/Landing/Login/Login.js'
import { Register } from './components/Landing//Register/Register.js'
import { RegisterModel } from './model/Landing/Register/Register.js'
import DataRetriever from './model/common/DataRetriever.js'
import { Landing } from './components/Landing/Landing.js'
/* eslint-disable */
new Login(document.querySelector('.login'))
new Register(document.querySelector('.register'))
new Landing(document.querySelector('.landing'))

function onCreate (createdUser) {
  // console.log(JSON.stringify(createdUser))
  DataRetriever.post(URL, createdUser)
}

/* eslint-enable */
const URL = 'https://api.myjson.com/bins/vkl1d'
DataRetriever.get(URL, (data) => {
/* eslint-disable */
  new LoginModel(document.querySelector('.login'), data)
  new RegisterModel(document.querySelector('.register'), data, onCreate)
/* eslint-enable */
})
