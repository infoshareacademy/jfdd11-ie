const bricks = document.querySelectorAll('.fruit');
const boardSize = 32;
const cells = Array.from(board.querySelectorAll('.cell'));

let y = 0;
let x = randomBrickStart();

addEventListener("keydown", function (event) {
  if (event.code === "ArrowRight") {
    x++;
    paintingBricks()
  }
  if (event.code === "ArrowLeft") {
    x--;
    paintingBricks()
  }
  if (event.code === "ArrowDown") {
    y++;
    paintingBricks();
  }
});
function randomBrickStart(){
  return Math.round(Math.random() * boardSize);
  }
function randomBrick(){
  return Object.keys(blocks)[Math.floor(Math.random() * Object.keys(blocks).length)];
}
function weCanGoDown(){

}
function weCanGoSide(){
  
}
function getCellsWeWantToPaint() {
  
  const cellsInFirstRow = cells.filter((cell, index) => index >= x + boardSize * y && index < x + 4 + boardSize * y)
  const cellsInSecondRow = cells.filter((cell, index) => index >= x + (boardSize * (y + 1)) && index < x + 4 + (boardSize * (y + 1)))
  const cellsInThirdRow = cells.filter((cell, index) => index >= x + (boardSize * (y + 2)) && index < x + 4 + (boardSize * (y + 2)))
  const cellsInFourthRow = cells.filter((cell, index) => index >= x + (boardSize * (y + 3)) && index < x + 4 + (boardSize * (y + 3)))

  const ourCells = cellsInFirstRow.concat(cellsInSecondRow, cellsInThirdRow, cellsInFourthRow);

  let newBrick = blocks.BigO[3].join('').split('')

  const hashIndexes = newBrick.map((symbol, index) => ({ symbol, index })).filter(item => item.symbol === '#').map(item => item.index);

  return hashIndexes.map(index => ourCells[index])
}

function paintingBricks() {
  const cellsWeWantToPaint = getCellsWeWantToPaint();
  const cellsWeHavePainted = document.querySelectorAll('.fruit:not(.blocked)');

  // wyciągnąć funkcję na zewnątrz
  const weCanGoDown = cellsWeWantToPaint.every(cell => {
    return cell !== undefined //&& !cell.classList.contains('blocked')
  })
  if (weCanGoDown === false) {
    y = -1;
    cellsWeHavePainted.forEach(item => item.classList.add('blocked'));
    return;
  }
  const weCanGoSide = cellsWeWantToPaint.every(cell => {
    return !cell.classList.contains("blocked");
  }) 
  if(weCanGoSide === false){
    return;
  }

  // remove all existing cells
  cellsWeHavePainted.forEach(item => item.classList.remove('fruit'));

  cellsWeWantToPaint.forEach(cell => cell.classList.add('fruit'))
}
// spadanie klocków

setInterval(function () {
  y++;
  paintingBricks();
}, 200);