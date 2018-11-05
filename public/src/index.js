const nameDisplay = document.getElementById('name-display')
const nameInput = document.getElementById('name-input')
const mapContainer = document.getElementById('map-container')
const mainContainer = document.getElementById('main-game-container')
const welcomeContainer = document.getElementById('welcome-container')
const difficultyContainer = document.getElementById('difficulty-container')
const highScores = document.getElementById('high-scores')
const scoreTable = document.getElementById('score-table')
const guesses = document.getElementById('guesses')
const answerText = document.getElementById('answer')
const scoreDisplay = document.getElementById('game-score-display')
const timeDisplay = document.getElementById('game-timer-display')
const guessTable = document.getElementById('guess-table')
const readyText = document.getElementById('ready')
const mapImage = document.querySelector('#map')

const startInput = function(event) {
  if (nameInput.value === '') {
    nameInput.focus()
  } else if (event.keyCode === 13 && scoreDisplay.innerText === 'SCORE') {
    nameInput.removeEventListener('keypress', startInput, true)
    game("easy")
  } else if (event.target.classList.contains('difficulty') && scoreDisplay.innerText === 'SCORE') {
    selectedDif = event.target.id
    game(selectedDif)
  }
}

difficultyContainer.addEventListener('click', startInput, true)
nameInput.addEventListener('keypress', startInput, true)

function mapOnWelcomeOff() {
  displaySquares()
  scoreTable.innerHTML = ''
  welcomeContainer.style.display = 'none'
  mapContainer.style.display='flex'
  highScores.style.display = 'none'
  guesses.style.display = 'block'
}

function mapOffWelcomeOn() {
  nameInput.addEventListener('keypress', startInput, true)
  mainContainer.removeEventListener('click', mapOffWelcomeOn)
  document.removeEventListener('keyup', keyRestart)
  answerText.style.display = 'none'
  scoreDisplay.innerText = 'SCORE'
  timeDisplay.innerText = '30s'
  guessTable.innerHTML = ''
  showHighScores()
  mainContainer.style.cursor = null
  mapContainer.style.display = 'none'
  guesses.style.display = 'none'
  welcomeContainer.style.display = 'flex'
  highScores.style.display = 'block'
}

function keyRestart(event) {
  event.preventDefault()
  mapOffWelcomeOn()
}

function randomNum(limit) {
  return Math.floor(Math.random() * limit)
}

function showHighScores() {
  API.getHighScores()
    .then( data => {
      scoreTable.innerHTML = ''
      data.forEach(renderScore)
    })
}

function renderScore(score, userScore=false) {
  scoreEl = document.createElement('tr')
  scoreEl.innerHTML = `
      <td>${score.rank}</td>
      <td>${score.username}</td>
      <td>${score.score}</td>
    `
  if (score.rank === userScore.rank) {
        scoreEl.classList.add('blink')
      }
  scoreTable.appendChild(scoreEl)
}

showHighScores()