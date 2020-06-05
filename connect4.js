/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

// if ( navigator.platform.indexOf('Win') != -1 ) {
//   window.document.getElementById("wrapper").setAttribute("class", "windows");
// } else if ( navigator.platform.indexOf('Mac') != -1 ) {
//   window.document.getElementById("wrapper").setAttribute("class", "mac");
// }

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */
const htmlBoard = document.querySelector("#board")
function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
//const htmlBoard = document.querySelector("#board")
  // TODO: add comment for this code
  // create the table row
  let top = document.createElement("tr");
  // set the id to column-top
  top.setAttribute("id", "column-top");
  // add an event listener for when the top of a column is clicked it will drop the item to the next available cell in relation to the bottom.
  top.addEventListener("click", handleClick);
  // loop over the columns giving the top cell an id of 0-6 left to right
 
  // indicate the which player's turn it is
  const playerTurn = document.getElementById('playerTurn')
  playerTurn.innerText = `Player ${currPlayer}`;

  for (let x = 0; x < WIDTH; x++) {
    //create a data container for each top cell
    let headCell = document.createElement("td");
    headCell.addEventListener("mouseover", function(){
      if (currPlayer===1){
        this.style.backgroundColor = "blue"
      }
      else {this.style.backgroundColor = "red"}
    })
    headCell.addEventListener("mouseleave", function(){
      this.style.backgroundColor = "black"
    })
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  // loop over all cells giving them an id of num-num based on their position in each row
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const gamePiece = document.createElement("div");
  if (y === 5) {gamePiece.classList.add("fall1")}
  if (y === 4) {gamePiece.classList.add("fall2")}
  if (y === 3) {gamePiece.classList.add("fall3")}
  if (y === 2) {gamePiece.classList.add("fall4")}
  if (y === 1) {gamePiece.classList.add("fall5")}
  if (y === 0) {gamePiece.classList.add("fall6")}
  if (currPlayer === 1){
    gamePiece.classList.add("piece","p1")
  }
  if (currPlayer ===2){
    gamePiece.classList.add("piece","p2")
  }
  let cell = document.getElementById(`${y}-${x}`)
  cell.append(gamePiece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg)
}

/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
  //  indicate which player's turn it is. 
  let player = () =>{if (currPlayer ===1){
    return 2}
    else { return 1}
  }
  playerTurn.innerText = `Player ${player()}`;

  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    const winner = document.getElementById("winner");
    winner.innerText = `Player ${currPlayer} wins!`;
    popUp.style.display = "block";
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))){
    const winner = document.getElementById("winner");
    winner.innerText = `Tie! Wow, what a game!`;
    popUp.style.display = "block";
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2  
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */
function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  // loop through all the cells in the board array
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // checks to see if a player has a set of 4 horizontally
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      // checks to see if a player has a set of 4 vertically
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      // checks to see if a player has a diag starting from the right
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      // checks to see if a player has a diag starting from the left
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      // if any of the above are true returns true for an alert of who won the game.
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

//function for when the start button is clicked
const startGame =() =>{
  startButton.remove();
  makeBoard();
  makeHtmlBoard();
}

//create startButton
const startButton = document.createElement("button");
startButton.addEventListener("click",startGame);
    startButton.type = "Button";
    startButton.setAttribute("id", "start")
  startButton.innerText= "Start Game!";
  document.body.append(startButton);

// Get the modal
const popUp = document.getElementById("overModal");

// Get the <span> element that closes the modal
const close = document.getElementsByClassName("close")[0];

// Get the play again button
const playAgain = document.getElementById("play");

playAgain.addEventListener("click",function(){
  htmlBoard.innerHTML = '';
  board = [];
  popUp.style.display = "none";
  currPlayer = 1
  playerTurn.innerText = `Player ${currPlayer}`;
  makeBoard();
  makeHtmlBoard();
});

const closePopUp = function(){
  popUp.style.display = "none";
  htmlBoard.innerHTML = '';
  playerTurn.innerText = "";
  board = [];
  const startButton = document.createElement("button");
  startButton.addEventListener("click",startGame);
    startButton.type = "Button";
    startButton.setAttribute("id", "start")
  startButton.innerText= "Start Game!";
  document.body.append(startButton);
};

close.addEventListener("click",closePopUp);

