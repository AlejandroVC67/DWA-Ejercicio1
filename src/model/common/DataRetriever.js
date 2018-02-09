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
      this.previousData = JSON.stringify(previousData)
      console.log(this.previousData)
      this.newData = this.previousData.concat(JSON.stringify(data))
      console.log(this.newData)
      fetch(url, {
        method: 'PUT', // or 'PUT'
        body: this.newData,
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => console.log(res))
    })
  }
}
