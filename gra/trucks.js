let trucks = cells.slice(884);
let wallOne = cells.slice(861, 862);
let wallTwo = cells.slice(872, 873);

wallOne.forEach(item => item.classList.add('wall'));
wallTwo.forEach(item => item.classList.add('wall'));
wallOne.forEach(item => item.classList.add('blocked'));
wallTwo.forEach(item => item.classList.add('blocked'));
trucks.forEach(item => item.classList.add('truck'));

let cellNodes = document.querySelectorAll('.cell');
cellNodes.forEach((el, index) => {
        if ([0, 33].includes(index % boardSize)) {
                el.classList.add('blocked')
                el.classList.add('wall');
        }
})


let truckNodes = document.querySelectorAll('.truck');
truckNodes.forEach((el, index) => {
        if ([11, 22].includes(index % boardSize)) {
                el.classList.add('blocked')
                el.classList.add('wall');
        }
})

truckNodes.forEach((el, index) => {
        if (index % boardSize < 12) {
                el.classList.add('truck-one');
        }
})

truckNodes.forEach((el, index) => {
        if (index % boardSize < 22 && index % boardSize > 12) {
                el.classList.add('truck-two');
        }
})

truckNodes.forEach((el, index) => {
        if (index % boardSize > 22) {
                el.classList.add('truck-three');
        }
})

function detectTruck() {
        ourBricks = document.querySelectorAll('.fruit');
        truckOne = document.querySelectorAll('.truck-one');


        if (ourBricks.classList.contains('truck')) {
                truckOne.forEach((el) => {
                        el.classList.remove('truck');
                        el.classList.add('wall')
                })
        }
}
// game end logic
// if truck id 1 && truck id 2 && truck id 3 has .blocked class -> end game
// end game = end game screen class .hidden off; show number of points (score added to local storage; check if highest score in local storage if true -> congrats popup) 