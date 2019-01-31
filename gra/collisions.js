// przyjąłem prowizorycznny ruch klocków żeby ustalić kolizje. dla demonstracji tworzę klocka na 1 komórce i przeszkodę na 5 komórce. prowizoryczny ruch odbywa się tylko w prawo i lewo (sterowanie strzałkami). warunek kolizji jest ustawiony na krawędź planszy (null) i na elementy z klasą "blocked". 

// przykładowy klocek
let brickNode = document.querySelector(".cell");
brickNode.classList.add("brick");
// przykładowa przeszkoda
let brickObstacle = document.querySelector(".cell:nth-child(5)");
brickObstacle.classList.add("blocked");

addEventListener("keyup", function(event){
  if (event.code === "ArrowRight") {
    let targetNode = brickNode.nextElementSibling;
    if (targetNode === null || targetNode.classList.contains("blocked")) {
      return;
    }
    // prowizoryczny ruch
    moveBrick(brickNode, targetNode);
    brickNode = document.querySelector(".brick")
  }
  if (event.code === "ArrowLeft") {
    let targetNode = brickNode.previousElementSibling;
    if (targetNode === null || targetNode.classList.contains("blocked")) {
      return;
    }
    // prowizoryczny ruch
    moveBrick(brickNode, targetNode);
    brickNode = document.querySelector(".brick")
    
  }
});
  // prowizoryczny ruch
  function moveBrick(fromNode, toNode) {
    fromNode.classList.remove("brick");
    toNode.classList.add("brick");
  }