const board = document.getElementById("board");
const status = document.getElementById("status");
const retryButton = document.getElementById("retry");
const resetButton = document.getElementById("reset");
let currentPlayer = "X";
let cells = Array(9).fill(null);

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }

  return cells.every((cell) => cell) ? "Draw" : null;
}

function handleClick(e) {
  const index = e.target.dataset.index;

  if (!cells[index]) {
    cells[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add("taken");

    const winner = checkWinner();
    if (winner) {
      status.textContent =
        winner === "Draw" ? "It's a draw!" : `Player ${winner} wins!`;
      board
        .querySelectorAll(".cell")
        .forEach((cell) => (cell.style.pointerEvents = "none"));
      retryButton.style.display = "block";
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      status.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function resetGame() {
  cells = Array(9).fill(null);
  currentPlayer = "X";
  status.textContent = "Player X's turn";
  board.innerHTML = "";
  retryButton.style.display = "none";
  createBoard();
}

function resetBoard() {
  resetGame();
  retryButton.style.display = "none";
}

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
  }
}

retryButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetBoard);

createBoard();