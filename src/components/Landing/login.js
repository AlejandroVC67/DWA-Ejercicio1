import './mainLanding.scss'
import template from './login.pug'
export class Login {
  constructor (node) {
    this.node = node
    this.generateHTML()
  }

  generateHTML () {
    this.node.innerHTML += template()
  }
}
