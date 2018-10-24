const game = function (difficulty) {

  const options = []
  const winner = {}

  API.getRandomLocation()
    .then(data => { 
      options.push(...data)
      Object.assign(winner, options[randomNum(options.length)])
      let lat = winner.latitude
      let lon = winner.longitude
      let zoom
      switch (difficulty) {
        case "easy":
          zoom = 14
          break
        case "medium":
          zoom = 15
          break
        case "hard":
          zoom = 16
          break
      }
      mapOnWelcomeOff()
      updateMap(lat, lon, zoom)
    })

  return {
    reportWinner
  }
}

