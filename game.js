const game = function (difficulty) {

  const options = []
  const winner = {}
  const timeDisplay = document.getElementById('game-timer-display')
  const scoreDisplay = document.getElementById('game-score-display')
  const readyText = document.getElementById('ready')
  const answerText = document.getElementById('answer')
  const gameDifficulty = difficulty
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
      switch (gameDifficulty) {
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
      updateMap(lat, lon, zoom)
      squares.forEach(square => square.style.opacity = 1)
      options.forEach(renderGuess)
      mapOnWelcomeOff()
      readyText.style.display='block'
      setTimeout(startGame, 3000)
    })

  function startGame() {
    readyText.style.display='none'
    removeFirstSquare()
    timer = setInterval(countDown, 1000)
    scoreTick = setInterval(scoreDown, 30, 1)
    fadeRandomSquare()
  }

  function stopGame() {
    clearInterval(timer)
    clearInterval(scoreTick)
    squares.forEach(square => square.style.opacity = 0)
    answerText.classList.add('blink')
    answerText.innerHTML = `
      <p>${winner.constituency}</p>
      <p>${winner.postcode}</p>
    `
    answerText.style.display='block'
    setTimeout(() => answerText.classList.remove('blink'), 2000)
    timeDisplay.classList.remove('blink')
    console.log('Game stopped')
  }

  function renderGuess(option) {
    optionEl = document.createElement('tr')
    optionEl.innerHTML = `
      <td class="guess hvr-bounce-in" data-constituency="${option.constituency}">
        ${option.constituency}
      </td>
    `
    optionEl.addEventListener('click', event => {
      if (event.target.dataset.constituency === winner.constituency) {
        console.log('User guessed correctly')
        stopGame()
      } else {
        console.log('Incorrect guess')
        flashRed(scoreDisplay)
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
      score = 0
      scoreDisplay.innerText = score
      timeDisplay.classList.remove('blink')
      console.log('Time ran out')
      stopGame()
    }
  }

  function scoreDown(n) {
    score -= n
    scoreDisplay.innerText = score
  }

  function flashRed(text) {
    text.style.color='red'
    setTimeout(() => text.style.color='chartreuse', 200)
  }
  
}

