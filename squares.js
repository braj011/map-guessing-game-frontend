const squares = []

function displaySquares() {
  let leftPos = 0
  let topPos = 0

  for (let i = 0; i < 9; i++) {
    let square = document.createElement('div')
    square.className = 'square'
    square.style.left = `${leftPos}px`
    square.style.top = `${topPos}px`
    square.style.opacity = 1;
    if (leftPos === 400) {
      leftPos = 0
      topPos += 200
    } else {
      leftPos += 200
    }
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
    square.style.opacity = square.style.opacity - 0.030
  } else if (square.style.opacity < 0.8) {
    square.style.opacity = square.style.opacity - 0.015
  } else {
    square.style.opacity = square.style.opacity - 0.006
  }
  setTimeout(fadeSquare, 50, square)
}

function fadeRandomSquare() {
  let index = randomNum(squares.length)
  fadeSquare(squares[index])
}

function randomNum(limit) {
  return Math.floor(Math.random() * limit)
}