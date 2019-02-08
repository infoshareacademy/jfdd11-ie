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
        if (index % boardSize < 11 && index % boardSize > 0) {
                el.classList.add('truck-one');
                el.setAttribute('data-id' , '1');
        }
})

truckNodes.forEach((el, index) => {
        if (index % boardSize < 22 && index % boardSize > 11) {
                el.classList.add('truck-two');
                el.setAttribute('data-id' , '2');
        }
})

truckNodes.forEach((el, index) => {
        if (index % boardSize > 22 && index % boardSize < 33) {
                el.classList.add('truck-three');
                el.setAttribute('data-id' , '3');

        }
})
