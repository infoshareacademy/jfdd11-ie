const boardSize = 34;
const board = document.getElementById('board');
const colors = ['#C14470', '#3AC7A4','#FCC141','#466ECE','#CACACA','#5EC456','#A454C7' ];



const pickRandom = items => items[Math.floor(Math.random() * items.length)]
let currentColor = pickRandom(colors);

makeBoard(board, boardSize, 40);
const bricks = document.querySelectorAll('.fruit');

const cells = Array.from(board.querySelectorAll('.cell'));
let gameIsPaused = false;
let y = 0;
let x = randomBrickStart();
let currentBrickName = randomBrick();
let currentBrickFrame = 0;
addEventListener("keyup", function (event){
if(event.code === "Escape"){
  gameIsPaused = !gameIsPaused
}

})
window.addEventListener("keydown", function (event) {
  if(event.code === "Space"){
    currentBrickFrame = (4 + currentBrickFrame+1)%4;
    if(!weCanGo()){
      currentBrickFrame = (4 + currentBrickFrame-1)%4;
      return;  
    }
  }
  if(gameIsPaused){
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
  paintingBricks();
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
    currentColor = pickRandom(colors);
    return;
  }

  // remove all existing cells
  cellsWeHavePainted.forEach(item => 
    {
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

// spadanie klocków
setInterval(function () {
  if(gameIsPaused){
    return;
  }
  y++;
  paintingBricks();
}, 200);