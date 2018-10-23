class API {

  static init () {
    this.baseUrl = 'https://map-guessing-game.herokuapp.com/api/v1/areas'
  }

  static getRandomLocation () {
    return fetch(this.baseUrl)
      .then(resp => resp.json())
  }

}
API.init()