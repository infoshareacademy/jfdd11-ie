const boardSize = 34;
const board = document.getElementById('board');

makeBoard(board, boardSize, 40);
const bricks = document.querySelectorAll('.fruit');

const cells = Array.from(board.querySelectorAll('.cell'));

let y = 0;
let x = randomBrickStart();

window.addEventListener("keydown", function (event) {
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
  paintingBricks();
});
let currentBrickName = randomBrick();
let currentBrickFrame = 0;
addEventListener ("keydown",function(event){
  if(event.code === "Space"){
    currentBrickFrame = (currentBrickFrame+1)%4;
  }
  });

function randomBrickStart(){
  return Math.floor(Math.random() * (boardSize - 4));
}
function randomBrick(){
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

function paintingBricks() {
  const cellsWeWantToPaint = getCellsWeWantToPaint();
  const cellsWeHavePainted = document.querySelectorAll('.fruit:not(.blocked)');
  
  if (!weCanGo()) {
    cellsWeHavePainted.forEach(item => item.classList.add('blocked'));
    currentBrickName = randomBrick();
    y = -1;
    x = randomBrickStart()
    return;
  }

  // remove all existing cells
  cellsWeHavePainted.forEach(item => item.classList.remove('fruit'));

  // paint new cells
  cellsWeWantToPaint.forEach(cell => cell.classList.add('fruit'))
  
}

// spadanie klocków
setInterval(function () {
  y++;
  paintingBricks();
}, 200);