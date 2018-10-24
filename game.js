const game = function (difficulty) {

  const options = []
  const winner = {}
  const timeDisplay = document.getElementById('game-timer-display')
  let timer
  let seconds = 30

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
      options.forEach(renderGuess)
      timer = setInterval(countDown, 1000)
      console.log(timer)
    })

  function renderGuess(option) {
    optionEl = document.createElement('tr')
    optionEl.innerHTML = `
      <td class="guess hvr-bounce-in" data-district="${option.district}">
        ${option.district}
      </td>
    `
    optionEl.addEventListener('click', event => {
      if (event.target.dataset.district === winner.district) {
        console.log('User guessed correctly')
        stopGame()
      } else {
        console.log('Incorrect guess')
      }
    })
    document.getElementById("guess-table").appendChild(optionEl)
  }

  function countDown() {
    seconds--
    timeDisplay.innerText = `${seconds}s`
    if (seconds === 11) {
      timeDisplay.classList.add('blink')
    } else if (seconds === 0) {
      timeDisplay.classList.remove('blink')
      console.log('Time ran out')
      stopGame()
    }
  }

  function stopGame() {
    squares.forEach(square => square.style.opacity = 0)
    clearInterval(timer)
    console.log('Game stopped')
  }
  
}

