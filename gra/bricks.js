let bricks = document.querySelectorAll('.fruit');


const cells = Array.from(board.querySelectorAll('.cell'));

let y = 0;
var x = 0;

setInterval(function () {
  y += 1;
  const boardSize = 32;
  const cellsInFirstRow = cells.filter((cell, index) => index >= x + boardSize * y && index < x + 4 + boardSize * y)
  const cellsInSecondRow = cells.filter((cell, index) => index >= x + (boardSize * (y + 1)) && index < x + 4 + (boardSize * (y + 1)))
  const cellsInThirdRow = cells.filter((cell, index) => index >= x + (boardSize * (y + 2)) && index < x + 4 + (boardSize * (y + 2)))
  const cellsInFourthRow = cells.filter((cell, index) => index >= x + (boardSize * (y + 3)) && index < x + 4 + (boardSize * (y + 3)))



  const ourCells = cellsInFirstRow.concat(cellsInSecondRow, cellsInThirdRow, cellsInFourthRow);

  const ourL = blocks.L[2].join('').split('')



  const hashIndices = ourL.map((symbol, index) => ({ symbol, index })).filter(item => item.symbol === '#').map(item => item.index);

  const cellsWeWantToPaint = hashIndices.map(index => ourCells[index])
  const cellsWeHavePainted = document.querySelectorAll('.fruit:not(.blocked)');

  const weCanGo = cellsWeWantToPaint.every(cell => {
    return cell !== undefined && !cell.classList.contains('blocked')
  })



  if (weCanGo === false) {
    y = 0;
    cellsWeHavePainted.forEach(item => item.classList.add('blocked'));
    return;
  }

  // remove all existing cells
  cellsWeHavePainted.forEach(item => item.classList.remove('fruit'));

  cellsWeWantToPaint.forEach(cell => cell.classList.add('fruit'))

}, 200);