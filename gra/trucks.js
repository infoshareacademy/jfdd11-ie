let trucks = cells.slice(800);
let wallOne = cells.slice(778, 779);
let wallTwo = cells.slice(789, 790);

wallOne.forEach(item => item.classList.add('wall'));
wallTwo.forEach(item => item.classList.add('wall'));
wallOne.forEach(item => item.classList.add('blocked'));
wallTwo.forEach(item => item.classList.add('blocked'));
trucks.forEach(item => item.classList.add('truck'));

let truckNodes = document.querySelectorAll('.truck');
truckNodes.forEach((el, index) => {
        if ([10, 21].includes(index % 32)) {
                el.classList.add('blocked')
                el.classList.add('wall');
        }
})

truckNodes.forEach((el, index) => {
        if (index % 32 < 10) {
                el.classList.add('truck-one');
        }
})

truckNodes.forEach((el, index) => {
        if (index % 32 < 21 && index % 32 > 10) {
                el.classList.add('truck-two');
        }
})

truckNodes.forEach((el, index) => {
        if (index % 32 > 21) {
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