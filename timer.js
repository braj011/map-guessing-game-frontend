const timeDisplay = document.getElementById('game-timer-display')

function countDown(seconds) {
  seconds--
  timeDisplay.innerText = `${seconds}s`
  if (seconds === 0) {
    return outOfTime()

  }
  setTimeout(countDown, 1000, seconds)
}

function outOfTime() {
  alert('You lost!')
}