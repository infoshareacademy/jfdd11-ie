function makeBoard(target, size) {
  for (let y = 0; y < size; y += 1) {
    let rowNode = createNode("row");

    for (let x = 0; x < size; x += 1) {
      let cellNode = createNode("cell");

      rowNode.appendChild(cellNode);
    }

    target.appendChild(rowNode);
  }
}

function createNode(className) {
  const node = document.createElement("div");
  node.classList.add(className);

  return node;
}

function getIndexWithinParent(element) {
  return Array.from(element.parentNode.children).indexOf(element);
}

function getNextRow(element) {
  return element.parentElement.nextElementSibling
}

function moveBasket(fromNode, toNode) {
  fromNode.classList.remove("basket");
  toNode.classList.add("basket");
}



function moveFruit(element) {
  element.classList.remove("fruit");

  const columnIndex = getIndexWithinParent(element);
  const nextRow = getNextRow(element);
  if (nextRow === null) {
    console.log("game over");
    return;
  }
  const targetNode = nextRow.querySelector(
    `.cell:nth-child(${columnIndex + 1})`
  );
  targetNode.classList.add("fruit");
}




function spawnFruit() {
  const allFreeCellsInFirstRow = document.querySelectorAll(
    ".row:nth-child(1) .cell:not(.fruit)"
  );
  const howManyFreeCells = allFreeCellsInFirstRow.length;
  const randomIndex = Math.floor(Math.random() * howManyFreeCells);
  allFreeCellsInFirstRow[randomIndex].classList.add("fruit");
}

let spawnIntervalId = 0;
let fruitMovementIntervalId = 0;
let handler;

function play() {
  clearInterval(spawnIntervalId);
  clearInterval(fruitMovementIntervalId);

  const board = document.querySelector("#board");
  board.innerHTML = '';
  const scoreNode = document.querySelector("#score");
  
  let score = 0;
  
  updateScore(0);
  
  makeBoard(board, 10);
  
  const basketNode = document.querySelector(".row:last-child .cell");
  basketNode.classList.add("basket");


  window.removeEventListener("keyup", handler)
  
  handler = handleUserInput
  window.addEventListener("keyup", handler);
  
  fruitMovementIntervalId = setInterval(function() {
    const allFruitNodes = document.querySelectorAll(".fruit");
  
    allFruitNodes.forEach(function(element, index) {
      moveFruit(element);
      detectFruitBasketCollision();
    });
  }, 500);
  
  spawnIntervalId = setInterval(spawnFruit, 3000);  

  function updateScore(deltaOfPoints) {
    score += deltaOfPoints;
    scoreNode.textContent = score;
  }

  function detectFruitBasketCollision() {
    const potentiallyRemovableFruit = document.querySelector(".fruit.basket");
  
    if (potentiallyRemovableFruit !== null) {
      potentiallyRemovableFruit.classList.remove("fruit");
      updateScore(1);
    }
  }

  function handleUserInput(event) {
    // console.log(event.code);
    const basketNode = document.querySelector(".basket");
  
    if (event.code === "ArrowRight") {
      const targetNode = basketNode.nextElementSibling;
      if (targetNode === null) {
        return;
      }
      moveBasket(basketNode, targetNode);
    }
  
    if (event.code === "ArrowLeft") {
      const targetNode = basketNode.previousElementSibling;
      if (targetNode === null) {
        return;
      }
      moveBasket(basketNode, targetNode);
    }
  
    detectFruitBasketCollision();
  }
}