let trucks = cells.slice(800);
let wallOne = cells.slice(778, 779);
let wallTwo = cells.slice(789, 790);

wallOne.forEach(item => item.classList.add('wall'));
wallTwo.forEach(item => item.classList.add('wall'));
trucks.forEach(item => item.classList.add('truck'));

let truckNodes = document.querySelectorAll('.truck');
truckNodes.forEach((el, index) => {
        if([10, 21].includes(index % 32)) {
                el.classList.add('wall')
        }
})

firstTruck = truckNodes.forEach((el, index) => {
        if( index % 32 < 10 ) {
                el.classList.add('truck-one');
        }
})

secondTruck = truckNodes.forEach((el, index) => {
        if(index%32 < 21 && index % 32 > 10) {
                el.classList.add('truck-two');
        }
})

thirdTruck = truckNodes.forEach((el, index) => {
        if(index % 32 > 21) {
                el.classList.add('truck-three');
        }
})