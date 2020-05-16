//variables needed to start the game
const gameContainer = document.getElementById("game");
let openCards = []
let matchedCards = []
let counter = 0
let saved =[]
let savedGames = JSON.parse(localStorage.getItem("savedGames"))|| [0];

// function to save score to local storage
const setScores = function(){
  localStorage.setItem("savedGames", JSON.stringify(savedGames));}



// function to get saved scores from local storage,figure out which one is the best, and post the best score
const getScores = function(){
  savedGames.sort(function(a,b){return a-b})
  if (savedGames[1]=== undefined){return savedGames[0]}
  else{return savedGames[1]}
}
const bestScore = getScores();

//get the score to list in currentScore 
// list the current score and best score on the web page.
const currentScore = document.getElementById("currentScore");
document.body.appendChild(currentScore);
currentScore.innerText = `Score: ${counter} Best Score: ${bestScore}`;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// FISHER YATES
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);
console.log(shuffledColors);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

//function for when the start button is clicked
let startGame =function(){
  createDivsForColors(shuffledColors);
  startButton.remove();
const restartButton = document.createElement("button");
restartButton.type = "Restart";
restartButton.innerText = "Restart Game!";
document.body.append(restartButton);
restartButton.addEventListener("click", reStartGame)
}

//function for when restart button is clicked
let reStartGame = function(){
  shuffledColors=shuffle(COLORS);
  gameContainer.innerHTML = '';
  createDivsForColors(shuffledColors);
  const restartButton = document.createElement("button");
  restartButton.type = "Restart";
  restartButton.innerText = "Restart Game!";
  document.body.append(restartButton);
  restartButton.addEventListener("click", reStartGame);
  counter = 0;
  openCards =[];
  currentScore.innerText = `Score: 0 Best Score: ${bestScore}`
  restartButton.remove()
}

//create startButton
const startButton = document.createElement("button");
startButton.addEventListener("click",startGame);
    startButton.type = "Button";
    startButton.classList.add("centered")
  startButton.innerText= "Start Game!";
  document.body.append(startButton);
  
  

// FUNCTION FOR EVERY CLICK ON A CARD
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  //console.log("you just clicked", event.target);
  counter ++;
  //console.log(counter);
  currentScore.innerText= `Score: ${counter} Best Score: ${bestScore}`;
  let colorName = event.target.className;
    //console.log(colorName)
    event.target.style.background = colorName;
    // Push open card onto the openCard array
    openCards.push(this);
    this.removeEventListener("click", handleCardClick);
    var pairs = openCards.length;
      if (pairs === 2) {
        // disable event listener to other cards
        disable();
        // see if the two open cards match
        if(openCards[0].className === openCards[1].className){
        console.log("MATCHED!")
        // if cards match add cards to matched cards array
        matchedCards.push(openCards[0], openCards[1]);
        //console.log(matchedCards.length)
        // if the matched cards array reaches the length of 10 end the game
        gameOver(matchedCards.length);
        //clear the open cards
        openCards = [];
        //console.log(openCards);
        // enable event listener to other cards
        enable();
        }
        else {
        // if the cards are unmatched  
        //console.log("UnMatched!");
        setTimeout(function(){
          openCards[0].style.backgroundColor = 'white';
          openCards[0].addEventListener("click", handleCardClick);
          openCards[1].style.backgroundColor = 'white';
          openCards[1].addEventListener("click", handleCardClick);
          openCards = [];
          console.log(openCards);
          //enable event listener to other cards
          enable();
        },800) 
      }
    }
}

// function to disable cards
function disable(){
  for (let i =0; i< gameContainer.childElementCount; i ++){
    gameContainer.children[i].removeEventListener("click", handleCardClick);
  }
}

// function to enable cards
function enable(){
  for (let i =0; i< gameContainer.childElementCount; i ++){
    gameContainer.children[i].addEventListener("click", handleCardClick);
  }
}


//When all colors are matched send alert: Game Over! You scored x points. The current lowest score is x points.
function gameOver(num){
  if (num ==10) {
  const score = document.getElementById("score");
  savedGames.push(counter);
  setScores();
  getScores();
score.innerText = `You completed the game in ${counter} moves! Best Score ${bestScore}`;
popUp.style.display = "block";
}};

// Get the modal
const popUp = document.getElementById("overModal");

// Get the <span> element that closes the modal
const close = document.getElementsByClassName("close")[0];

// Get the play again button
const playAgain = document.getElementById("play");
playAgain.addEventListener("click",function(){
  shuffledColors = shuffle(COLORS);
  gameContainer.innerHTML = '';
  counter = 0;
  matchedCards = [];
  openCards =[];
  createDivsForColors(shuffledColors);
  currentScore.innerText = `Score: 0 Best Score: ${getScores()}`
  popUp.style.display = "none";
});
const closePopUp = function(){
  popUp.style.display = "none";
}
close.addEventListener("click",closePopUp);


