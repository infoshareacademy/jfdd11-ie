// function detectFruitBasketCollision() {
//     const potentiallyRemovableFruit = document.querySelector(".fruit.basket");
  
//     if (potentiallyRemovableFruit !== null) {
//       potentiallyRemovableFruit.classList.remove("fruit");
//     }
//   }

  function handleUserInput(event) {
    const brickNode = document.querySelector(".cell");
  
    if (event.code === "ArrowRight") {
      const targetNode = basketNode.nextElementSibling;
      if (targetNode === null) {
        return;
      }
      moveBrick(basketNode, targetNode);
    }
  
    if (event.code === "ArrowLeft") {
      const targetNode = basketNode.previousElementSibling;
      if (targetNode === null) {
        return;
      }
      moveBrick(basketNode, targetNode);
    }
  }
