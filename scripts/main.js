window.addEventListener('DOMContentLoaded', () => {

  let gameOver = false
  const grid = document.querySelector('.grid')
  let score = 0
  let lives = 3
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
  squareElement[3].classList.add('alien')
  squareElement[5].classList.add('alien')
  squareElement[7].classList.add('alien')
  squareElement[12].classList.add('alien')
  squareElement[14].classList.add('alien')
  squareElement[16].classList.add('alien')
  squareElement[18].classList.add('alien')
  squareElement[21].classList.add('alien')
  squareElement[23].classList.add('alien')
  squareElement[25].classList.add('alien')
  squareElement[27].classList.add('alien')

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

  // move aliens down
  const alien = {
    position: [1, 3, 5, 7, 12, 14, 16, 18, 21, 23, 25, 27]
  }

  let movesMade = 0
  function moveAliens() {
    for(let i = 0; i < alien.position.length; i++) {
      if (gameOver) {
        return
      }
      if (alien.position[i] > 79) {
        gameOver = true
        $('#game-over-score').text(score)
        $('.game').hide()
        $('.game-over').css('display', 'flex')
      }
      if (movesMade === 3) {
        squareElement[alien.position[i]].classList.remove('alien')
        alien.position[i] = alien.position[i] + 10
        squareElement[alien.position[i]].classList.add('alien')
      } else if (movesMade === 1) {
        squareElement[alien.position[i]].classList.remove('alien')
        alien.position[i] = alien.position[i] + 10
        squareElement[alien.position[i]].classList.add('alien')
      } else if (movesMade > 1 && movesMade < 4) {
        squareElement[alien.position[i]].classList.remove('alien')
        alien.position[i] = alien.position[i] - 1
        squareElement[alien.position[i]].classList.add('alien')
      } else if(movesMade < 1) {
        squareElement[alien.position[i]].classList.remove('alien')
        alien.position[i] = alien.position[i] + 1
        squareElement[alien.position[i]].classList.add('alien')
      }
    }
    if (movesMade === 3) {
      movesMade = 0
    } else {
      movesMade++
    }
  }

  // add audio
  const playAudio = document.getElementById('shoot_sound')

  //fire missile
  function fireMissile(e) {
    const missilePosition = ship.position - 10
    switch(e.keyCode) {
      case 32:
        squareElement[missilePosition].classList.add('missile')
        missile.position.push(missilePosition)
        playAudio.play()
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

  // alien missile attack
  const alienMissile = {
    position: []
  }

  function alienAttack() {
    const alienPosition = alien.position
    const attackingAlienPosition = Math.floor(Math.random()*alienPosition.length)
    alienMissile.position.push(alien.position[attackingAlienPosition])
    alienAttackMovement()
  }

  //move alien attack
  function alienAttackMovement() {
    for (let x = 0; x <alienMissile.position.length; x++) {
      if (alienMissile[x] < 0) {
        alienMissile.position = alienMissile.position.filter(alienMissile => alienMissile > 99)
      } else if (squareElement[alienMissile.position[x]] !== undefined){
        squareElement[alienMissile.position[x]].classList.remove('alien_missile')
        alienMissile.position[x] = alienMissile.position[x] + 10
        squareElement[alienMissile.position[x]].classList.add('alien_missile')
      }
      livesLost()

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
        $('#score').text('Score: ' + score)
        console.log(score)
      }
    }

    //game-over + total score screen
    if (alien.position.length === 0) {
      $('#game-over-score').text(score)
      $('.game').hide()
      $('.game-over').show().css('display', 'flex')
    }
  }
  // remove ship on missile hit & add lives
  // decrease lives & game over once lives = 0
  function livesLost() {
    console.log(lives)
    for(let x = 0; x < alienMissile.position.length; x++) {
      if (alienMissile.position[x] === ship.position) {
        lives = lives - 1
        $('#lives').text('Lives: ' + lives)

        alienMissile.position.splice(x, 1)

        if (lives === 0) {
          gameOver = true
          $('#game-over-score').text(score)
          $('.game').hide()
          $('.game-over').css('display', 'flex')
        }

        return
      }
    }
  }

  //reload button
  const playAgainButton = document.querySelector('.game-over button')
  playAgainButton.addEventListener('click', () => {
    location.reload()
    $('.game-over').hide()
    $('.start-screen').hide()
    $('.game').show().css('display', 'flex')
  })

  //start screen
  const startButton = document.querySelector('.start-screen button')
  startButton.addEventListener('click', () => {
    $('.start-screen').hide()
    $('.game').show().css('display', 'flex')

    window.addEventListener('keydown', moveShip)
    window.addEventListener('keydown', fireMissile)
    window.setInterval(moveMissile, 200)
    window.setInterval(alienAttack, 600)
    window.setInterval(moveAliens, 1000)
  })
})
