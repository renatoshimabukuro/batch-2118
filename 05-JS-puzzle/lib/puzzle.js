import confetti from "https://esm.sh/canvas-confetti@1.6.0";

// Select all the tiles
const tiles = document.querySelectorAll("td");

const canMove = (tile) => {
  // TODO: Check if a tile has an empty neighbour => Return boolean
  // Get tiles, above, below, right and left

  // get the tile above
  // get the row that the tile is in
  const row = tile.parentElement;

  // get all the rows in the table
  const table = document.querySelector("table");
  const rows = table.rows;
  // get the row above
  const rowAbove = rows[row.rowIndex - 1];
  // get the tile in the row above in the same column
  let cellAbove;
  if (rowAbove != undefined) {
    const cellsInRowAbove = rowAbove.cells;
    cellAbove = cellsInRowAbove[tile.cellIndex];
  }

  // get the tile below
  // Get the row below
  const rowBelow = rows[row.rowIndex + 1];
  // get the tile in the row below in the same column
  let cellBelow;
  if (rowBelow != undefined) {
    const cellsInRowBelow = rowBelow.cells;
    cellBelow = cellsInRowBelow[tile.cellIndex];
  }

  // get the tile left
  // Get all the cells in the row
  const cells = row.cells;
  // Get the index of the clicked tile
  // Get the cell that is index - 1
  const leftCell = cells[tile.cellIndex - 1];

  // get the tile right
  const rightCell = cells[tile.cellIndex + 1];

  // If any of them have class empty return true
  // else return false

  // Filter out undefined cells

  const neighboringCells = [rightCell, leftCell, cellAbove, cellBelow];
  const cellsThatExist = neighboringCells.filter((cell) => cell != undefined);

  // If cells that exist contains a cell with empty class
  return cellsThatExist.some((element) => element.classList.contains("empty"));
};

const moveTile = (element) => {
  // Grab the empty tile
  const emptyTile = document.querySelector(".empty");
  // Remove the class empty from the empty tile
  emptyTile.classList.toggle("empty");
  // Insert the number of the clicked tile into the empty tile
  const number = element.innerText;
  emptyTile.innerText = number;
  // Remove the number from the clicked tile
  element.innerText = "";
  // Add the empty class to the clicked tile
  element.classList.toggle("empty");
};

const checkIfPlayerWins = () => {
  // TODO: Check if player has won
  // Cells in the table as an array
  const cells = Array.from(document.querySelectorAll("td"));
  // check if each cell has inner text that is index + 1
  if (
    cells
      .slice(0, 14)
      .every((cell, index) => cell.innerText === (index + 1).toString())
  ) {
    confetti();
  }
};

// Add event listener on each tile - Do not change the following
tiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    if (canMove(tile)) {
      moveTile(tile);
      checkIfPlayerWins();
    }
  });
});
