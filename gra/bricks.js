const boardSize = 34;
const board = document.getElementById('board');

makeBoard(board, boardSize, 40);
const bricks = document.querySelectorAll('.fruit');

const cells = Array.from(board.querySelectorAll('.cell'));
const allCells = cells.slice(0);
let gameIsPaused = false;
let y = 0;
let x = randomBrickStart();
addEventListener("keyup", function (event) {
  if (event.code === "Escape") {
    gameIsPaused = !gameIsPaused
  }

})
window.addEventListener("keydown", function (event) {
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
      truckNodes.forEach((el, index) => {
        if (index % boardSize < 11 && index % boardSize > 0) {
          el.classList.remove('fruit');
          el.classList.remove('blocked');
        }
      })
    }
  }
  if (event.code === "KeyS") {
    if (blockedTruckIds[2] === true) {
      console.log("nie pośmigasz")
    }
    else {
      truckNodes.forEach((el, index) => {
        if (index % boardSize < 22 && index % boardSize > 11) {
          el.classList.remove('fruit');
          el.classList.remove('blocked');
        }
      })
    }
  }
  if (event.code === "KeyD") {
    if (blockedTruckIds[3] === true) {
      console.log("nie pośmigasz")
    }
    else {
      truckNodes.forEach((el, index) => {
        if (index % boardSize > 22 && index % boardSize < 33) {
          el.classList.remove('fruit');
          el.classList.remove('blocked');
        }
      })
    }
  }
  paintingBricks();
});
let currentBrickName = randomBrick();
let currentBrickFrame = 0;
addEventListener("keyup", function (event) {
  if (event.code === "Space") {
    currentBrickFrame = (currentBrickFrame + 1) % 4;
  }
});

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
  currentBrickName = randomBrick();
  y = -1;
  x = randomBrickStart();
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
      // Block truck with that id
      blockedTruckIds[truckId] = true
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
    cellsWeHavePainted.forEach(item => item.classList.add('blocked'));


    makeNewBrick();
    return;
  }

  // remove all existing cells
  cellsWeHavePainted.forEach(item => item.classList.remove('fruit'));

  // paint new cells
  cellsWeWantToPaint.forEach(cell => cell.classList.add('fruit'))

}

// spadanie klocków
setInterval(function () {
  if (gameIsPaused) {
    return;
  }
  y++;
  paintingBricks();
}, 200);