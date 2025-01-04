N_BOMBS = 40;
HEIGHT = 14;
WIDTH = 18;

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

function generateBoard() {
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

console.table(generateBoard());