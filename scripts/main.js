window.addEventListener('DOMContentLoaded', () => {

  const ship = document.querySelector('#ship')
  const grid = document.querySelector('.grid')

  document.onkeydown = function(e) {
    if (e.keyCode === 37) {
      // Move Left
      ship.left = ship.left - 10
    }
    if (e.keyCode === 39) {
      // Move Right
      ship.left = ship.left + 10
      console.log('here')
    }
    moveShip()
  }

  function moveShip() {
    document.querySelector('#ship').style.left = ship.left + 'px'
    console.log(moveShip)
  }

  for(let x  = 0; x < 100; x++) {
    const square = document.createElement('div')
    square.setAttribute('class', 'square')
    if (x === 95) {
      square.classList.add('ship')
      console.log(square)
    }
    grid.appendChild(square)
  }
})
