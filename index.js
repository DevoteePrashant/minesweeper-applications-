let rows = 15;
let cols = 10;
let totalBombs = 10;
const buttons = [];
const bombs = new Set();

document.getElementById('myButton').addEventListener('click', update);
document.getElementById('resetButton').addEventListener('click', resetGame);

function initializeGame() {
    const gameTable = document.getElementById('gameTable');
    gameTable.innerHTML = '';
    //  table td grid lop
    for (let r = 0; r < rows; r++) {
        const row = document.createElement('tr');
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('td');
            const button = document.createElement('button');
            button.dataset.row = r;
            button.dataset.col = c;
            button.addEventListener('click', handleClick);
            cell.appendChild(button);
            row.appendChild(cell);
            buttons.push(button);
        }
        gameTable.appendChild(row);
    }
    //  set td    bombs and update neighbor counts
    placeBombs();
    updateNeighborCounts();
}

// set bombs functions 7 bom set 
function placeBombs() {
    bombs.clear();
    while (bombs.size < totalBombs) {
        const index = Math.floor(Math.random() * buttons.length);
        bombs.add(index);
    }
}
//  button click to call function

function handleClick(event) {
    const button = event.target;
    const row = parseInt(button.dataset.row);
    const col = parseInt(button.dataset.col);
    const index = row * cols + col;

    if (bombs.has(index)) {
        // Game over reveal bomb set btn  and  update game state in div 
        button.textContent = 'B';
        button.classList.add('revealed');
        alert('Game Over!');
        revealBombs();
        document.getElementsByClassName('latest')[0].innerHTML = 'Game Over!';
    } else {
        revealCell(row, col);
        document.getElementsByClassName('latest')[0].innerHTML = 'Continue playing Game is NOT Over.';
    }
}


function revealCell(row, col) {
    // Reveal cell function not show in bomb
    const index = row * cols + col;
    const button = buttons[index];
    if (button.classList.contains('revealed')) return;

    const count = countNeighborBombs(row, col);
    button.classList.add('revealed');
    if (count > 0) {
        button.textContent = count;
    } else {
        button.textContent = '';
        forEachNeighbor(row, col, (r, c) => revealCell(r, c));
    }
}


// Iterate over neighboring  set all table td
function forEachNeighbor(row, col, action) {
    for (let r = row - 1; r <= row + 1; r++) {
        for (let c = col - 1; c <= col + 1; c++) {
            if (r >= 0 && r < rows && c >= 0 && c < cols && (r !== row || c !== col)) {
                action(r, c);
            }
        }
    }
}

// Count neighboring bombs set ronde bomb
function countNeighborBombs(row, col) {
    return Array.from({ length: 3 }).reduce((count, _, rOffset) => {
        return count + Array.from({ length: 3 }).reduce((innerCount, _, cOffset) => {
            const r = row + rOffset - 1;
            const c = col + cOffset - 1;
            if ((r !== row || c !== col) && r >= 0 && r < rows && c >= 0 && c < cols) {
                const index = r * cols + c;
                return innerCount + (bombs.has(index) ? 1 : 0);
            }
            return innerCount;
        }, 0);
    }, 0);
}

// Reveal all bombs show in bomb
function revealBombs() {
    bombs.forEach(index => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        const button = buttons[index];
        button.innerHTML = '<i class="fa-solid fa-bomb"></i>';
        button.classList.add('revealed');
    });
}
// Update neighbor counts set number of bomb
function updateNeighborCounts() {
    buttons.forEach(button => {
        const row = parseInt(button.dataset.row);
        const col = parseInt(button.dataset.col);
        const count = countNeighborBombs(row, col);
        if (count > 0) {
            button.textContent = count;
        }
    });
}
// Reset game , transparent show in btn
function resetGame() {
    buttons.forEach(button => {
        button.textContent = '';
        button.classList.remove('revealed');
    });
    bombs.clear();
    buttons.length = 0;
    initializeGame();
}

function update() {
    //      get input
    let height = document.getElementById('height').value.trim();
    let width = document.getElementById('width').value.trim();
    let mines = document.getElementById('mines').value.trim();

    if (height !== "" && width !== "" && mines !== "" ) {
        localStorage.setItem('height', height);
        localStorage.setItem('width', width);
        localStorage.setItem('mines', mines);

        resetGame();
        console.log("working");
        if ( mines <= 250 ){
            console.log("filed working");
            totalBombs = parseInt(mines);
        }else{
            alert("Please fill bomb in 250 to <= in.");
            resetGame()
        }
        if ( height <= 50 ){
            console.log("filed working");
            rows = parseInt(height);
        }else{
            alert("Please fill in height 50 to <= in.");
            resetGame()
        }
        if ( width <= 50 ){
            console.log("filed working");
            cols = parseInt(width);
        }else{
            alert("Please fill in width 50 to <= in.");
            resetGame()
        }
    } else {
        alert("Please fill out all fields.");
        resetGame()
    }
}
