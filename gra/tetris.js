const board = document.getElementById('board');

        makeBoard(board, 32, 40);

        const blocks = {
            L: [
                [
                    '__#_',
                    '__#_',
                    '__##',
                    '____'
                ]
            ]
        }

        const cells = Array.from(board.querySelectorAll('.cell'));
        const x = 0;
        const y = 0;
        const boardSize = 32;
        const cellsInFirstRow = cells.filter((cell, index) => index >= x + boardSize * y && index < x + 4 + boardSize * y)
        const cellsInSecondRow = cells.filter((cell, index) => index >= x + (boardSize * (y + 1)) && index < x + 4 + (boardSize * (y + 1)))
        const cellsInThirdRow = cells.filter((cell, index) => index >= x + (boardSize * (y + 2)) && index < x + 4 + (boardSize * (y + 2)))
        const cellsInFourthRow = cells.filter((cell, index) => index >= x + (boardSize * (y + 3)) && index < x + 4 + (boardSize * (y + 3)))

        const ourCells = cellsInFirstRow.concat(cellsInSecondRow, cellsInThirdRow, cellsInFourthRow);

        const ourL = blocks.L[0].join('').split('')

        // for (let i = 0; i < 16; i += 1) {
        //     if (ourL[i] === '#') {
        //         ourCells[i].classList.add('fruit')
        //     }
        // }