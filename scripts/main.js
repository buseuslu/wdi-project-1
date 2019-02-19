window.addEventListener('DOMContentLoaded', () => {


  const grid = document.querySelector('.grid')
  let score = 0
  // const ship = document.querySelector('#ship')

  // add grid
  for(let x  = 0; x < 100; x++) {
    const square = document.createElement('div')
    square.setAttribute('class', 'square')
    square.className = 'square'
    square.id = x
    grid.appendChild(square)
  }

  // move ship
  const ship = {
    position: 95
  }

  const squareElement = document.querySelectorAll('.square')
  squareElement[1].classList.add('alien')
  squareElement[2].classList.add('alien')
  squareElement[3].classList.add('alien')
  squareElement[4].classList.add('alien')
  squareElement[5].classList.add('alien')
  squareElement[6].classList.add('alien')
  squareElement[7].classList.add('alien')
  squareElement[8].classList.add('alien')

  squareElement[ship.position].classList.add('ship')


  function moveShip(e) {
    switch(e.keyCode) {
      case 37:
        squareElement.forEach((square => square.classList.remove('ship')))
        if (ship.position > 90) {
          ship.position--
        }
        squareElement[ship.position].classList.add('ship')
        break
      case 39:
        squareElement.forEach((square => square.classList.remove('ship')))
        if (ship.position < 99) {
          ship.position++
        }
        squareElement[ship.position].classList.add('ship')
        break
    }
  }

  // move aliens
  const alien = {
    position: [1 ,2, 3, 4, 5, 6, 7, 8]
  }

  function moveAliens() {
    if (gameOver) {
      return
    }
    const aliens = document.querySelectorAll('.alien')
    for(let x = 0; x < aliens.length; x++) {
      if (alien.position[x] > 79) {
        gameOver = true
        alert('game over')
        return
      }

      squareElement[alien.position[x]].classList.remove('alien')
      alien.position[x] = alien.position[x] + 10
      squareElement[alien.position[x]].classList.add('alien')
    }
  }

  //fire missile
  function fireMissile(e) {
    const missilePosition = ship.position - 10
    console.log(missilePosition)
    switch(e.keyCode) {
      case 32:
        squareElement[missilePosition].classList.add('missile')
        missile.position.push(missilePosition)
        break
    }
  }

  // move missiles
  const missile = {
    position: []
  }

  function moveMissile() {
    for(let x = 0; x < missile.position.length; x++) {
      if (missile.position[x] < 0) {
        missile.position = missile.position.filter(missile => missile > 0)
        // squareElement[missile.position[x]].classList.remove('missile')
      } else {
        squareElement[missile.position[x]].classList.remove('missile')
        missile.position[x] = missile.position[x] - 10
        squareElement[missile.position[x]].classList.add('missile')
      }

      // Check here after we have moved the missiles
      removeAlienMissile(x)
    }
  }

  //remove alien & missile
  function removeAlienMissile(missileElement) {
    const missilePosition = missile.position[missileElement]
    for (let x = 0; x < alien.position.length; x++) {
      if (alien.position[x] === missilePosition) {
        // Remove is from alien.position so it is not redrawn again by the interval timer
        alien.position.splice(x, 1)
        // Remove it from the missile.position so it is not redrawn again by the interval timer
        missile.position.splice(missileElement, 1)
        // Remove it from the page
        squareElement[missilePosition].classList.remove('alien', 'missile')

        score = score + 10
        $('#Score').text('Score: ' + score)
      }
    }
  }


  // //remove alien & missile
  // function removeAlienMissile(missile) {
  //   console.log(missile, alien.position)
  //   if(alien.position.some(pos => pos === missile)) {
  //     squareElement[missile].classList.remove('alien', 'missile')
  //   }
  // }

  //start screen
  // function myFunction() {
  //   let myWindow = window.open('', 'myWindow', 'width=200,height=100')
  //   myWindow.document.write('<p>This is \'myWindow\'</p>')
  //   myWindow.opener.document.write('<p>This is the source window!</p>')
  // }

  //game-over screen
  let gameOver = false
  window.addEventListener('keydown', moveShip)
  window.addEventListener('keydown', fireMissile)
  window.setInterval(moveAliens, 5000)
  window.setInterval(moveMissile, 500)

})
