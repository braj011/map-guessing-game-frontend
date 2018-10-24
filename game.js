const game = function (difficulty) {

  const options = []
  const winner = {}
  const timeDisplay = document.getElementById('game-timer-display')
  const scoreDisplay = document.getElementById('game-score-display')
  const readyText = document.getElementById('ready')
  let timer
  let seconds = 30
  let scoreTick
  let score = 1000

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
      readyText.style.display='block'
      updateMap(lat, lon, zoom)
      options.forEach(renderGuess)
      setTimeout(startGame, 3000)
    })

  function startGame() {
    readyText.style.display='none'
    removeFirstSquare()
    timer = setInterval(countDown, 1000)
    scoreTick = setInterval(scoreDown, 30, 1)
    fadeRandomSquare()
  }

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
        scoreDown(100)
        event.target.style.color = 'red'
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

  function scoreDown(n) {
    score -= n
    scoreDisplay.innerText = score
  }

  function stopGame() {
    squares.forEach(square => square.style.opacity = 0)
    clearInterval(timer)
    clearInterval(scoreTick)
    console.log('Game stopped')
  }
  
}

