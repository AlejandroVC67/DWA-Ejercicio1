import template from './register.pug'
export class Register {
  constructor (node) {
    this.node = node
    this.generateHTML()
  }
  generateHTML () {
    this.node.innerHTML += template()
  }
}
