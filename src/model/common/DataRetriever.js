export default class DataRetriever {
  static get (url, callback) {
    fetch(url)
        .then((response) => {
          return response.json()
        })
        .then(callback)
  }

  static post (url, data) {
    DataRetriever.get(url, (previousData) => {
      // console.log(previousData)
      this.newData = JSON.stringify(previousData.concat(data))
      //  console.log(this.newData)
      fetch(url, {
        method: 'PUT',
        body: this.newData,
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => console.log(res))
    })
  }

  static postJob (url, updatedPerson, data, callback) {
    // console.log(updatedPerson)
    data.forEach(element => {
      if (element.Person[0].email === updatedPerson.Person[0].email && element.Person[0].password === updatedPerson.Person[0].password) {
        const index = data.indexOf(element)
        data.splice(index, 1, updatedPerson)
      }
    })
    // fetch(url, {
    //   method: 'PUT',
    //   body: JSON.stringify(data),
    //   headers: new Headers({
    //     'Content-Type': 'application/json'
    //   })
    // }).then(callback(updatedPerson))
  }
}
