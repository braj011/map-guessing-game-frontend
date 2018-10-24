const timeDisplay = document.getElementById('game-timer-display')

function countDown(seconds) {
  seconds--
  timeDisplay.innerText = `${seconds}s`
  if (seconds === 11) {
    timeDisplay.classList.add('blink')
  } else if (seconds === 0) {
    timeDisplay.classList.remove('blink')
    return setTimeout(outOfTime, 1000)
  }
  setTimeout(countDown, 1000, seconds)
}

function outOfTime() {
  alert('You lost!')
}