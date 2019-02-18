window.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.grid')
  // const ship = document.querySelector('#ship')

  // add grid
  for(let x  = 0; x < 100; x++) {
    const square = document.createElement('div')
    square.setAttribute('class', 'square')
    if (x === 95) {
      square.classList.add('ship')
      console.log(square)
    }
    grid.appendChild(square)
  }

  // move ship
  const ship = {
    position: 95
  }
  const squareElement = document.querySelectorAll('.square')
  // squareElement[55].classList.add('alien')
  squareElement[ship.position].classList.add('ship')

  let shipIndex = ship.position
  function moveShip(e) {
    squareElement.forEach((square => square.classList.remove('ship')))
    switch(e.keyCode) {
      case 37:
        shipIndex--
        squareElement[shipIndex].classList.add('ship')
        break
      case 39:
        shipIndex++
        squareElement[shipIndex].classList.add('ship')
      // break
      // case 32:
      // squareElement[shipIndex].classList.add('laser')

    }
  }

  window.addEventListener('keydown', moveShip)


})
