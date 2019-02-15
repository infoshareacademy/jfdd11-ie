function makeBoard(target, sizeY, sizeX) {
  for (let y = 0; y < sizeX; y += 1) {
    let rowNode = createNode("row");

    for (let x = 0; x < sizeY; x += 1) {
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

// function getIndexWithinParent(element) {
//   return Array.from(element.parentNode.children).indexOf(element);
// }

// function getNextRow(element) {
//   return element.parentElement.nextElementSibling
// }

// function moveBasket(fromNode, toNode) {
//   fromNode.classList.remove("basket");
//   toNode.classList.add("basket");
// }



// function movebrick(element) {
//   element.classList.remove("brick");

//   const columnIndex = getIndexWithinParent(element);
//   const nextRow = getNextRow(element);
//   if (nextRow === null) {
//     console.log("game over");
//     return;
//   }
//   const targetNode = nextRow.querySelector(
//     `.cell:nth-child(${columnIndex + 1})`
//   );
//   targetNode.classList.add("brick");
// }




function spawnbrick() {
  // const allFreeCellsInFirstRow = document.querySelectorAll(
  //   ".row:nth-child(1) .cell:not(.brick)"
  // );
  // const howManyFreeCells = allFreeCellsInFirstRow.length;
  // const randomIndex = Math.floor(Math.random() * howManyFreeCells);
  // allFreeCellsInFirstRow[randomIndex].classList.add("brick");
}

// let spawnIntervalId = 0;
// let brickMovementIntervalId = 0;
// let handler;

function play() {
  // clearInterval(spawnIntervalId);
  // clearInterval(brickMovementIntervalId);

  const board = document.querySelector("#board");
  board.innerHTML = '';
  // const scoreNode = document.querySelector("#score");
  
  // let score = 0;
  
  // updateScore(0);
  
  // makeBoard(board, 10);
  
  // const basketNode = document.querySelector(".row:last-child .cell");
  // basketNode.classList.add("basket");


  // window.removeEventListener("keyup", handler)
  
  // handler = handleUserInput
  // window.addEventListener("keyup", handler);
  const allbrickNodes = document.querySelectorAll(".brick");
  brickMovementIntervalId = setInterval(function() {
    
  
    allbrickNodes.forEach(function(element, index) {
      movebrick(element);
      detectbrickBasketCollision();
    });
  }, 500);
  
  // spawnIntervalId = setInterval(spawnbrick, 3000);  

  // function updateScore(deltaOfPoints) {
  //   score += deltaOfPoints;
  //   scoreNode.textContent = score;
  // }

  function detectbrickBasketCollision() {
    const potentiallyRemovablebrick = document.querySelector(".brick.basket");
  
    if (potentiallyRemovablebrick !== null) {
      // potentiallyRemovablebrick.classList.remove("brick");
      // updateScore(1);
    }
  }
  const basketNode = document.querySelector(".basket");
  function handleUserInput(event) {
    
  
    // if (event.code === "ArrowRight") {
    //   const targetNode = basketNode.nextElementSibling;
    //   if (targetNode === null) {
    //     return;
    //   }
    //   moveBasket(basketNode, targetNode);
    // }
  
    // if (event.code === "ArrowLeft") {
    //   const targetNode = basketNode.previousElementSibling;
    //   if (targetNode === null) {
    //     return;
    //   }
    //   moveBasket(basketNode, targetNode);
    // }
  
    // detectbrickBasketCollision();
  }
}