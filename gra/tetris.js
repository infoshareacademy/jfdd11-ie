const board = document.getElementById('board');

        makeBoard(board, 32, 40);

        const blocks = {
            L: [
                [
                    '_#__',
                    '_#__',
                    '_##_',
                    '____'
                ]
                [
                    '____',
                    '###_',
                    '#___',
                    '____'
                ]
                [
                    '##__',
                    '_#__',
                    '_#__',
                    '____'
                ]
                [
                    '__#_',
                    '###_',
                    '____',
                    '____'
                ]
            ],

            I: [
                [
                    '_#__',
                    '_#__',
                    '_#__',
                    '_#__'

                ]
                [
                    '____',
                    '####',
                    '____',
                    '____'
                ]
                [
                    '__#_',
                    '__#_',
                    '__#_',
                    '__#_'

                ]
                [
                    '____',
                    '____',
                    '####',
                    '____'

                ]

            ],
            J: [
                [
                    '_#__',
                    '_#__',
                    '##__',
                    '____'
                ]
                [
                    '#___',
                    '###_',
                    '____',
                    '____'
                ]
                [
                    '_##_',
                    '_#__',
                    '_#__',
                    '____'

                ]
                [
                    '____',
                    '###_',
                    '__#_',
                    '____'
                ]
            ],
            O:[
                [
                   '##__',
                   '##__',
                   '____',
                   '____' 
                ]

            ],
            S:[
                [
                    '____',
                    '_##_',
                    '##__',
                    '____'
                ]
                [
                    '#___',
                    '##__',
                    '_#__',
                    '____'
                ]
                [
                    '_##_',
                    '##__',
                    '____',
                    '____'
                ]
                [
                    '_#__',
                    '_##_',
                    '__#_',
                    '____'
                ]
            ],
            T:[ [
                    '____',
                    '###_',
                    '_#__',
                    '____'
                ]
                [
                    '_#__',
                    '##__',
                    '_#__',
                    '____'
                ]
                [
                    '_#__',
                    '###_',
                    '____',
                    '____'
                ]
                [
                    '_#__',
                    '_##_',
                    '_#__',
                    '____'
                ]
            ],
            Z:[
                [
                    '____',
                    '##__',
                    '_##_',
                    '____'
                ]
                [
                    '_#__',
                    '##__',
                    '#___',
                    '____'
                ]
                [
                    '##__',
                    '_##_',
                    '____',
                    '____'
                ]
                [
                    '__#_',
                    '_##_',
                    '_#__',
                    '____'
                ]
            ],
            BigO:[
                [
                    '####',
                    '####',
                    '####',
                    '####'
                ]
            ],

            BigI:[
                [
                    '##__',
                    '##__',
                    '##__',
                    '##__'
                ]
                [
                    '####',
                    '####',
                    '____',
                    '____'
                ]
                [
                    '__##',
                    '__##',
                    '__##',
                    '__##'
                ]
                [
                    '____',
                    '____',
                    '####',
                    '####'
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

        for (let i = 0; i < 16; i += 1) {
            if (ourL[i] === '#') {
                ourCells[i].classList.add('fruit')
            }
        }