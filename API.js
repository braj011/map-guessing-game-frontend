class API {
  static init () {
    this.baseUrl = 'https://map-guessing-game.herokuapp.com/api/v1/'
  }

  static getRandomLocation () {
    return fetch(this.baseUrl + 'areas')
      .then(resp => resp.json())
  }

  static postUserScore (userScore) {
    return fetch(this.baseUrl + 'scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userScore)
    }).then(resp => resp.json())
  }
}

API.init()
