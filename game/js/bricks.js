const boardSize = 34;
const board = document.getElementById('board');
const colors = ['#C14470', '#3AC7A4', '#FCC141', '#466ECE', '#5EC456', '#A454C7'];

let score = 0;

const pickRandom = items => items[Math.floor(Math.random() * items.length)]
let currentColor = pickRandom(colors);
const popUpStatus = document.querySelector('.popup-body');
const scorePopUp = document.querySelector('.popup-score');
const resumeButton = document.querySelector('.resume-game');

makeBoard(board, boardSize, 40);
const bricks = document.querySelectorAll('.fruit');
let trucksNodes = document.querySelectorAll('.truck');
const blockedBrickSound = new Audio("sounds/NFF-bump-wood.wav");
const menuButtonHover = new Audio("sounds/NFF-finger-snap.wav");
const gameMusic = new Audio("main_theme_01.wav");
const submitButton = document.querySelector('.form-score')

const cells = Array.from(board.querySelectorAll('.cell'));
const allCells = cells.slice(0);
let gameIsPaused = false;
let y = 0;
let x = randomBrickStart();

function popUp() {
  popUpStatus.classList.toggle('hidden');
}

function checkIfGameEnds(truck1, truck2, truck3){
  if(truck1 === true && truck2 === true && truck3 === true){
    scorePopUp.classList.remove('hidden');
    let showScoreGameOver = document.querySelector('.show-score');
    showScoreGameOver.textContent = "Twój wynik: " + score;
    blockedBrickSound = "";
  }
}

submitButton.addEventListener('submit', event => { 
  event.preventDefault();
  const inputValue = event.target.name.value;
  addNewScore(inputValue);
})

function addNewScore(name) {
  fetch('https://moveitgame.firebaseio.com/moveitgame.json', {
    method: 'POST', 
    body: JSON.stringify({ 
      name: name,
      scores: score
    }) 
    } )
    .then(() => refreshScores())
}

let listScores = document.querySelector('.last-scores');

function refreshScores() {

  fetch("https://moveitgame.firebaseio.com/moveitgame.json").then(response => response.json()).then(scores => {
    // listScores.innerHTML = "";
    // scores
    //   .map(makeListItem)
    //   .forEach(score => listScores.appendChild(score));
    
    const scoresArray = Object.entries(scores);
    scoresArray.map(objects => Object.entries(objects).map(object => console.log(object)));
  })};

  const makeListItem = userScore => {
    const scoreNode = document.createElement("li");
    const viewNode = document.createElement("div");
    // Compose all of the above
    scoreNode.textContent = userScore.name;

    scoreNode.appendChild(viewNode);
    return scoreNode;
  };

resumeButton.addEventListener('click', function (event) {
  event.target.blur();
  gameIsPaused = !gameIsPaused
  popUp();
});

addEventListener("keydown", function (event) {
  if (event.code === "Escape") {
    gameIsPaused = !gameIsPaused
    popUp();
  }
});

window.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    currentBrickFrame = (4 + currentBrickFrame + 1) % 4;
    menuButtonHover.play();
    if (!weCanGo()) {
      currentBrickFrame = (4 + currentBrickFrame - 1) % 4;
      return;
    }
  }
  if (gameIsPaused) {
    return;
  }
  if (event.code === "ArrowRight") {
    x++;
    if (!weCanGo()) {
      x--;
    }
  }
  if (event.code === "ArrowLeft") {
    x--;
    if (!weCanGo()) {
      x++;
    }
  }
  if (event.code === "ArrowDown") {
    y++;
    if (!weCanGo()) {
      y--;
    }
  }

  if (event.code === "KeyA") {
    if (blockedTruckIds[1] === true) {
      console.log("nie pośmigasz")
    }
    else {
      let scoreTruckOneNodes = document.querySelectorAll('.truck-one.blocked')
      score += scoreTruckOneNodes.length;
      blockTruck("1");
      showScore();
      truckNodes.forEach((el, index) => {
        if (index % boardSize < 11 && index % boardSize > 0) {
          el.classList.remove('fruit');
          el.classList.remove('blocked');
          el.style.backgroundColor = "";
         setTimeout(function() {
           unblockTruck("1");
         }, 30000)
        }
      })
      
    }
  }

  if (event.code === "KeyS") {
    if (blockedTruckIds[2] === true) {
      console.log("nie pośmigasz")
    }
    else {
      let scoreTruckTwoNodes = document.querySelectorAll('.truck-two.blocked')
      score += scoreTruckTwoNodes.length;
      blockTruck("2");
      showScore();
      truckNodes.forEach((el, index) => {
        if (index % boardSize < 22 && index % boardSize > 11) {
          el.classList.remove('fruit');
          el.classList.remove('blocked');
          el.style.backgroundColor = "";
          setTimeout(function() {
           unblockTruck("2");
         }, 30000)
        }
      })
    }
  }
  if (event.code === "KeyD") {
    if (blockedTruckIds[3] === true) {
      console.log("nie pośmigasz")
    }
    else {
      let scoreTruckThreeNodes = document.querySelectorAll('.truck-three.blocked')
      score += scoreTruckThreeNodes.length;
      blockTruck("3");
      showScore();
      truckNodes.forEach((el, index) => {
        if (index % boardSize > 22 && index % boardSize < 33) {
          el.classList.remove('fruit');
          el.classList.remove('blocked');
          el.style.backgroundColor = "";
          setTimeout(function() {
           unblockTruck("3");
         }, 30000)
        }
      })
    }
  }
  paintingBricks();
});
let currentBrickName = randomBrick();
let currentBrickFrame = 0;



function randomBrickStart() {
  return Math.floor(Math.random() * (boardSize - 4));
}
function randomBrick() {
  return Object.keys(blocks)[Math.floor(Math.random() * Object.keys(blocks).length)];
}

function weCanGo() {
  return getCellsWeWantToPaint().every(cell => {
    return cell !== undefined && !cell.classList.contains('blocked')
  })
}
function getCellsWeWantToPaint() {

  const cellsInFirstRow = cells.filter((cell, index) => index >= x + boardSize * y && index < x + 4 + boardSize * y)
  const cellsInSecondRow = cells.filter((cell, index) => index >= x + (boardSize * (y + 1)) && index < x + 4 + (boardSize * (y + 1)))
  const cellsInThirdRow = cells.filter((cell, index) => index >= x + (boardSize * (y + 2)) && index < x + 4 + (boardSize * (y + 2)))
  const cellsInFourthRow = cells.filter((cell, index) => index >= x + (boardSize * (y + 3)) && index < x + 4 + (boardSize * (y + 3)))

  const ourCells = cellsInFirstRow.concat(cellsInSecondRow, cellsInThirdRow, cellsInFourthRow);
  let newBrick = blocks[currentBrickName][currentBrickFrame].join('').split('')

  const hashIndexes = newBrick.map((symbol, index) => ({ symbol, index })).filter(item => item.symbol === '#').map(item => item.index);

  return hashIndexes.map(index => ourCells[index])
}

function makeNewBrick() {
  currentColor = pickRandom(colors);
  currentBrickName = randomBrick();
  y = -1;
  x = randomBrickStart();
}

function incomingTruck() {
  setTimeout
}

function blockTruck(truckId) {
  // Block truck with that id
  blockedTruckIds[truckId] = true
  checkIfGameEnds(blockedTruckIds[1], blockedTruckIds[2], blockedTruckIds[3]);
  if (truckId === '1') {
    allCells.forEach((el, index) => {
      if (index % boardSize < 11 && index % boardSize > 0) {
        el.classList.add('blocked');
      }
    })
  }
  if (truckId === '2') {
    allCells.forEach((el, index) => {
      if (index % boardSize < 22 && index % boardSize > 11) {
        el.classList.add('blocked');
      }
    })
  }
  if (truckId === '3') {
    allCells.forEach((el, index) => {
      if (index % boardSize > 22 && index % boardSize < 33) {
        el.classList.add('blocked');
      }
    })
  }
  // TODO
}

function unblockTruck(truckId) {
  blockedTruckIds[truckId] = false;
  if (truckId === '1') {
    allCells.forEach((el, index) => {
      if (index % boardSize < 11 && index % boardSize > 0) {
        el.classList.remove('blocked');
      }
    })
  }
  if (truckId === '2') {
    allCells.forEach((el, index) => {
      if (index % boardSize < 22 && index % boardSize > 11) {
        el.classList.remove('blocked');
      }
    })
  }
  if (truckId === '3') {
    allCells.forEach((el, index) => {
      if (index % boardSize > 22 && index % boardSize < 33) {
        el.classList.remove('blocked');
      }
    })
  }
}

const blockedTruckIds = {
  1: false,
  2: false,
  3: false
}

function paintingBricks() {
  const cellsWeWantToPaint = getCellsWeWantToPaint();
  const cellsWeHavePainted = document.querySelectorAll('.fruit:not(.blocked)');

  if (!weCanGo()) {

    // If not every cell we have painted has class truck
    if (Array.from(cellsWeHavePainted).some(cell => !cell.classList.contains('truck'))) {
      // Find cell which has data-truck-id attribute and get its ID
      const cellWithinTruck = Array.from(cellsWeHavePainted).find(cell => cell.hasAttribute('data-id'))
      if (cellWithinTruck === undefined) {
        makeNewBrick();
        return
      }


      const truckId = cellWithinTruck.getAttribute('data-id');
      blockTruck(truckId);
    }
    cellsWeHavePainted.forEach(item => item.classList.add('blocked'));
    blockedBrickSound.play();
    makeNewBrick();
    return;
  }

  // remove all existing cells
  cellsWeHavePainted.forEach(item => {
    item.classList.remove('fruit')
    item.style.backgroundColor = ''
  }
  )
  // paint new cells
  cellsWeWantToPaint.forEach(item => {
    item.classList.add('fruit')
    item.style.backgroundColor = currentColor
  }

  )

}

let scoreDiv = document.querySelector('.score')

//liczenie punktów
function showScore() {
scoreDiv.textContent = "WYNIK: " + score;
}

// spadanie klocków
setInterval(function () {
  if (gameIsPaused) {
    return;
  }
  y++;
  paintingBricks();
}, 200);