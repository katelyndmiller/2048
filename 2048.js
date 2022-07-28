let board;
let score = 0;
let rows = 4;
let columns = 4;

window.onload = function () {
    setGame();
}

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    // board = [
    //     [2, 2, 2, 2],
    //     [2, 2, 2, 2],
    //     [4, 4, 8, 8],
    //     [4, 4, 8, 8]
    // ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            // creates a div tag with an id like "0-0"
            let tile = document.createElement("div");
            tile.id = r.toString() + '-' + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();
}

function updateTile (tile, num) {
    tile.innerText = ""; // clears the tile
    tile.classList.value = ""; // clears the class list so we don't have "tile x2 x4 x8 etc"
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add("x" + num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}

function setTwo () {
    if (!hasEmptyTile()) {
        return;
    }

    let found = false;
    while (!found) {
        // get random row and column
        let r = Math.floor(Math.random() * rows); // gives us a random # b/w 0 and 4
        let c = Math.floor(Math.random() * columns);

        if (board[r][c] === 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function hasEmptyTile () {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { //at least one zero in the board
                return true;
            }
        }
    }
    return false;
}

document.addEventListener("keyup", (e) => {
    if (e.code === "ArrowLeft") {
        slideLeft();
        setTwo();
    } else if (e.code === "ArrowRight") {
        slideRight();
        setTwo();
    } else if (e.code === "ArrowUp") {
        slideUp();
        setTwo();
    } else if (e.code === "ArrowDown") {
        slideDown();
        setTwo();
    }

    document.getElementById("score").innerText = score;
});

function filterZero (row) {
    return row.filter((num) => num !== 0) // creates a new array w/o the 0's
}

function slide (row) {
    row = filterZero(row); // step 1: get rid of 0's => [2,2,2]

    // step 2 => slide
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        } // [2,2,2] => [4,0,2]
    }

    row = filterZero(row); // [4,2]

    // add 0's back
    while (row.length < columns) {
        row.push(0);
    } // [4,2,0,0]

    return row;
}

function slideLeft () {
    /**
     * 1. Clear 0's - [2,2,2,0] => [2,2,2]
     * 2. Merge - [2,2,2] => [4,0,2]
     * 3. Clear 0's again - [4,0,2] => [4,2]
     * 4. Put 0's back - [4,2] => [4,2,0,0]
     */

    // iterate through each row on the board
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;

        // update tile styling
        for (let c = 0; c < columns; c++) {
            tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight () {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for (let c = 0; c < columns; c++) {
            tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp () {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown () {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}