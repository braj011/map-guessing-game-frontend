const squares = []

function displaySquares() {
  let currentSquares = mapContainer.getElementsByClassName('square')
  while (currentSquares[0]) {
    mapContainer.removeChild(currentSquares[0])
  }
  for (let i = 0; i < 9; i++) {
    let square = document.createElement('div')
    square.className = 'square'
    square.style.opacity = 1;
    mapContainer.appendChild(square)
    squares.push(square)
  }
}

function fadeSquare(square) {
  if (square.style.opacity < 0) {
    squares.splice(squares.indexOf(square), 1)
    if (!!squares.length) {
      fadeRandomSquare()
    }
    return
  } else if (square.style.opacity < 0.6) {
    square.style.opacity = square.style.opacity - 0.025
  } else if (square.style.opacity < 0.8) {
    square.style.opacity = square.style.opacity - 0.015
  } else {
    square.style.opacity = square.style.opacity - 0.010
  }
  setTimeout(fadeSquare, 50, square)
}

function fadeRandomSquare() {
  let index = randomNum(squares.length)
  fadeSquare(squares[index])
}

function removeFirstSquare() {
  let index = randomNum(squares.length)
  squares[index].style.opacity = 0
}
