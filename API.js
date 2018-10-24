class API {

  static init () {
    this.baseUrl = 'https://map-guessing-game.herokuapp.com/api/v1/'
  }

  static getRandomLocation () {
    return fetch(this.baseUrl + 'areas')
      .then(resp => resp.json())
  }

}
API.init()