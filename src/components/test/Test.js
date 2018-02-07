import './test.scss'
import template from './test.pug'
import data from '../Data/data.json'
export class Test {
  constructor (node) {
    this.node = node
    this.generateHTML(this.node)
  }

  generateHTML (node) {
    node.innerHTML = template(data)
  }
}
