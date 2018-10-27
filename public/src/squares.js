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
    let width
    let mq = window.matchMedia("only screen and (max-height: 600px)");
    if (mq.matches) {
      width = 100
    }
    else {
      width = 160
    }
    if (leftPos === 2 * width) {
      leftPos = 0
      topPos += width
    } else {
      leftPos += width
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
