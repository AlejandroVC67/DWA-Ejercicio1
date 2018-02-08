export class RegisterModel {
  constructor (node, data) {
    this.node = node
    this.data = data
    this.elements = {}
    this.elements.inputs = this.node.querySelectorAll('.landing__input')
    console.log(this.elements.inputs)
  }
}
