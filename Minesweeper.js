const N_BOMBS = 40;
const HEIGHT = 14;
const WIDTH = 18;

function numberize(a, b, board) {
    let bombs_arround = 0;
    for (let i = a - 1; i < a + 2; i++) {
        if (i < 0 || i >= HEIGHT) {
            continue;
        }
        for (let j = b - 1; j < b + 2; j++) {
            if (j < 0 || j >= WIDTH || i === j) {
                continue;
            }
            if (board[i][j] === "#") {
                bombs_arround++;
            }
        }
    }
    return bombs_arround;
}

function generateBombs() {
    let bombs = [];
    let rand = 0;
    for (let i = 0; i < HEIGHT * WIDTH; i++) {
        bombs.push(i >= N_BOMBS ? false : true);
    } 
    for (let i = 0; i < bombs.length; i++) {
        rand = Math.floor(Math.random() * bombs.length);
        [bombs[i], bombs[rand]] = [bombs[rand], bombs[i]];
    }
    return bombs;
}

function generateBackBoard() {
    let board = [];
    const bombs = generateBombs();
    for (let i = 0; i < HEIGHT; i++) {
        let line = [];
        for (let j = 0; j < WIDTH; j++) {
            line.push(bombs[i * WIDTH + j] ? "#" : ".");
        }
        board.push(line);
    }
    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            if (board[i][j] !== "#") {
                board[i][j] = numberize(i, j, board).toString();
            }
        }
    }
    return board;
}
function generateFrontBoard() {
    let board = [];
    for (let i = 0; i < HEIGHT; i++) {
        let line = [];
        for (let j = 0; j < WIDTH; j++) {
            line.push(".");
        }
        board.push(line);
    }
    return board;
}

function dig(a, b, backBoard, frontBoard) {
    if (a < 0 || b < 0 || a >= HEIGHT || b >= WIDTH) {
        return;
    }
    if (frontBoard[a][b] !== ".") {
        return;
    }
    frontBoard[a][b] = backBoard[a][b];

    if (backBoard[a][b] === "0") {
        for (let i = a - 1; i < a + 2; i++) {
            for (let j = b - 1; j < b + 2; j++) {
                dig(i, j, backBoard, frontBoard)
            }
        }
    }
    let main = document.getElementsByTagName('main')[0];
    main.innerHTML = "";
    console.log('AAOAO')
    createHTML(frontBoard);
}

function createHTML(frontBoard) {

    let main = document.body.getElementsByTagName('main')[0];

    for (let i = 0; i < HEIGHT; i++) {
        const row = document.createElement('div')
        row.setAttribute('id', 'row' + i)
        for (let j = 0; j < WIDTH; j++) {
            const block = document.createElement("div");
            block.setAttribute('id', 'block' + i + '-' + j);
            block.setAttribute('class', 'block');
            block.textContent = frontBoard[i][j];
            block.addEventListener('click', function() {
                dig(i, j, backBoard, frontBoard);
            });
            row.appendChild(block);
        }
        main.appendChild(row);
    }
}

let backBoard = generateBackBoard();
let frontBoard = generateFrontBoard();

createHTML(frontBoard)