// script.js
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const resetButton = document.querySelector("#reset");

let currentPlayer = "X";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Handle clicks on cells
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (boardState[index] !== "" || !gameActive || currentPlayer === "O") return; // If it's not the X player's turn

  boardState[index] = currentPlayer;
  cell.innerHTML = `<span>${currentPlayer}</span>`;
  
  checkWinner();
  if (gameActive) switchPlayer();
}

// Check if someone has won or the game is a draw
function checkWinner() {
  for (const condition of winningConditions) {
    const [a, b, c] = condition;

    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
      gameActive = false;
      return;
    }
  }

  if (!boardState.includes("")) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }
}

// Switch turns between players
function switchPlayer() {
  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;

    if (currentPlayer === "O") {
      setTimeout(botMove, 500); // Delay for bot to simulate thinking
    }
  }
}

// Bot's move (O player) - Picks a random empty cell
function botMove() {
  const emptyCells = boardState
    .map((value, index) => value === "" ? index : null)
    .filter(index => index !== null);
  
  if (emptyCells.length > 0) {
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    boardState[randomIndex] = "O";
    cells[randomIndex].innerHTML = `<span>O</span>`;
    checkWinner();
    if (gameActive) switchPlayer();
  }
}

// Reset the game
function resetGame() {
  boardState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  cells.forEach((cell) => (cell.innerHTML = ""));
}

// Add event listeners
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);

// Initialize game
statusText.textContent = `Player ${currentPlayer}'s Turn`;
