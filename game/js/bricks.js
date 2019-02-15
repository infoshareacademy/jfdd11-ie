const boardSize = 34;
const board = document.getElementById('board');
const colors = ['#C14470', '#3AC7A4', '#FCC141', '#466ECE', '#5EC456', '#A454C7'];

const blockedTruckIds = {
  1: false,
  2: false,
  3: false
}
const availableTruckIds = Object.entries(blockedTruckIds).map(([truckId, isBlocked]) => ({ truckId, isBlocked })).filter(({ isBlocked }) => isBlocked === false).map(({ truckId }) => parseInt(truckId));

const randomCanal = function getRandomCanal(){ 
let min = Math.min(...availableTruckIds);
let max = Math.max(...availableTruckIds);
return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomBrickStart() {
  return Math.floor(Math.random() * randomCanal()*10);
}

let score = 0;


const pickRandom = items => items[Math.floor(Math.random() * items.length)]
let currentColor = pickRandom(colors);
const scorePopUp = document.querySelector('.popup-score');
const pausePopUpStatus = document.querySelector('.popup-body');
const resumeButton = document.querySelector('.resume-game');
const musicButton = document.querySelector(".music-button");
const menuButtons = document.querySelectorAll(".add-button");

menuButtons.forEach(function(button){
  button.addEventListener("mouseenter", function(){
    menuButtonHover.play();
  });
  button.addEventListener("click", function(){
    menuButtonClick.play();
  });
});

makeBoard(board, boardSize, 40);
const bricks = document.querySelectorAll('.fruit');
let trucksNodes = document.querySelectorAll('.truck');
let blockedBrickSound = new Audio("sounds/NFF-bump-wood.mp3");
const brickRotateSound = new Audio("sounds/NFF-finger-snap.mp3");
const gameMusic = new Audio("sounds/main_theme_01.mp3");
gameMusic.loop = true;
const menuButtonHover = new Audio("sounds/NFF-menu-08-a.mp3");
const menuButtonClick = new Audio("sounds/NFF-menu-08-b.mp3");
const pauseSound = new Audio("sounds/NFF-suck.mp3");
const noRotateSound = new Audio("sounds/NFF-no-go.mp3");
let brickDestroySound = new Audio("sounds/NFF-robo-hit.mp3");
const gameOverSound = new Audio("sounds/game-over.mp3");


const submitButton = document.querySelector('.form-score')

const cells = Array.from(board.querySelectorAll('.cell'));
const allCells = cells.slice(0);
let gameIsPaused = false;
let y = 0;
let x = randomBrickStart();
let truckDeliveryTime = 30000;
let brickFallingSpeed = 200;
let gameOver = false;
let musicSwitchOn = true;
function hearTheMusicPlay(){
  if(musicSwitchOn === true){
    musicButton.classList.remove("off");
    gameMusic.play();
  }else{
    musicButton.classList.add("off");
    gameMusic.pause();
  }
}

function pauseMenuPopUp() {
  pausePopUpStatus.classList.toggle('hidden');
}

function showScorePopUp(){
  scorePopUp.classList.remove('hidden');
    let showScoreGameOver = document.querySelector('.show-score');
    showScoreGameOver.textContent = "Twój wynik to: " + score;
    brickDestroySound = "";
    blockedBrickSound = "";
    musicSwitchOn = false;
    hearTheMusicPlay();
}

function checkIfGameEnds(truck1, truck2, truck3){
  if(truck1 === true && truck2 === true && truck3 === true){
    gameOver = true;
    showScorePopUp();
    refreshScores();
    gameOverSound.play();
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
      score: score
    }) 
    } )
    .then(() => refreshScores())
}

let listScores = document.querySelector('.last-scores');

function refreshScores() {

  fetch("https://moveitgame.firebaseio.com/moveitgame.json").then(response => response.json()).then(objects => {
    
    let sortObjects = Object.entries(objects).map(object => ({ name: object[1].name, score: object[1].score })).sort((a,b) => b.score - a.score);
    let sortPlayers = sortObjects.map(objects => objects.name);
    let sortScores = sortObjects.map(objects => objects.score);

    for(let i = 0; i < 3; i++) {
      let playerScore = document.createElement('li');
      playerScore.textContent = sortPlayers[i] + ": " + sortScores[i];
      listScores.appendChild(playerScore); 
    }

    myPosition = sortScores.findIndex(score => score === myScore) + 1;

    if (userName.classList.contains('clicked') === true) {
        userName.innerHTML = '<br>Your position in the ranking: ' + myPosition + '<br><br><br>';
    }
    
    return myPosition;
  })};

  const makeListItem = userScore => {
    const scoreNode = document.createElement("li");
    const viewNode = document.createElement("div");
    // Compose all of the above
    scoreNode.textContent = userScore.name;

    scoreNode.appendChild(viewNode);
    return scoreNode;
  };
musicButton.addEventListener("click", function(){
  musicSwitchOn = !musicSwitchOn;
  hearTheMusicPlay();
})
resumeButton.addEventListener('click', function (event) {
  event.target.blur();
  gameIsPaused = !gameIsPaused
  pauseMenuPopUp();
  hearTheMusicPlay();
});

addEventListener("keydown", function (event) {
  if(gameOver === false){
  if (event.code === "Escape") {
    gameIsPaused = !gameIsPaused
    pauseMenuPopUp();
    if(gameIsPaused){
      musicSwitchOn = false;
      hearTheMusicPlay();
      pauseSound.play();
    }else{
      hearTheMusicPlay();
    }
  }
}
});

window.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    currentBrickFrame = (4 + currentBrickFrame + 1) % 4;
    brickRotateSound.play();
    if (!weCanGo()) {
      currentBrickFrame = (4 + currentBrickFrame - 1) % 4;
      noRotateSound.play();
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
         }, truckDeliveryTime)
        }
      })
      truckDeliveryTime += 5000;
      brickFallingSpeed -= 100;
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
         }, truckDeliveryTime)
        }
      })
      truckDeliveryTime += 5000;
      brickFallingSpeed -= 100;
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
         }, truckDeliveryTime)
        }
      })
      truckDeliveryTime += 5000;
      brickFallingSpeed -= 100;
    }
  }
  paintingBricks();
});
let currentBrickName = randomBrick();
let currentBrickFrame = 0;


gameMusic.play();

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



function paintingBricks() {
  const cellsWeWantToPaint = getCellsWeWantToPaint();
  const cellsWeHavePainted = document.querySelectorAll('.fruit:not(.blocked)');

  if (!weCanGo()) {

    // If not every cell we have painted has class truck
    if (Array.from(cellsWeHavePainted).some(cell => !cell.classList.contains('truck'))) {
      // Find cell which has data-truck-id attribute and get its ID
      const cellWithinTruck = Array.from(cellsWeHavePainted).find(cell => cell.hasAttribute('data-id'))
      if (cellWithinTruck === undefined) {
        brickDestroySound.play();
        score -= 40;
          if(score < 0) {
            gameOver = true;
            showScorePopUp();
            refreshScores();
            gameOverSound.play();
          }
        showScore();
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
}, brickFallingSpeed);