export default class DataRetriever {
  static get (url, callback) {
    fetch(url)
        .then((response) => {
          return response.json()
        })
        .then(callback)
  }
}
