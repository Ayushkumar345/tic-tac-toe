const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = "Your Turn 😊";
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("data-index");

    if (options[cellIndex] !== "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
    if (running) {
        setTimeout(computerMove, 500); // Computer moves after 500ms delay
    }
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer === "X" ? "❌" : "⭕";
    cell.style.color = currentPlayer === "X" ? "#ffeb3b" : "#ff4081";
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer === "X" ? "Your Turn 😊" : "Computer's Turn 🤖"}`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer === "X" ? "You Win! 🎉" : "Computer Wins! 😢"}`;
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = `It's a Draw! 😐`;
        running = false;
    } else {
        changePlayer();
    }
}

function computerMove() {
    if (!running) return;
    let availableCells = options.map((val, idx) => (val === "" ? idx : null)).filter(val => val !== null);
    if (availableCells.length === 0) return;

    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    options[randomIndex] = "O";
    cells[randomIndex].textContent = "⭕";
    cells[randomIndex].style.color = "#ff4081";

    checkWinner();
    // Here we don't change player, as the computer just played
    // We will change the player when the user clicks on their turn again
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = "Your Turn 😊";
    cells.forEach(cell => (cell.textContent = ""));
    running = true;
}
