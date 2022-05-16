// PLAY WHITH HUMAN
//-----------------
// DEFINE ALL VARIABLES
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winning-message')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const score = document.getElementById('score');
const newScore = document.getElementById('new-score');
const player1 = document.getElementById("ply1");
const player2 = document.getElementById("ply2");
const totalGame = document.getElementById("totalGame");
const Draw = document.getElementById("draw");
let circleTurn;
const scoreboard = {
    player1: 0,
    player2: 0
};
const gameboard = {
        numOfDraws: 0,
        numOfGames: 0,
    }
    // START GAME: INVOKE START GAME FUNCTION TO START PLAYING 
startGame()

// ADD EVENT LISTENER TO RESTART BUTTON 
restartButton.addEventListener('click', startGame)
restartButton.addEventListener('click', addGame)

// DEFINE START GAME FUNCTION
function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}
// DEFINE HANDLE CLICK FUNCTION
function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
        gameboard.numOfDraws++;
        draw.innerText = `Number of Draws: ${gameboard.numOfDraws}`;

    } else {
        swapTurns()
        setBoardHoverClass()
    }
}
// DEFINE END GAME METHOD
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        const winner = `${circleTurn ? document.getElementById("name2").value : document.getElementById("name1").value}`
        winningMessageTextElement.innerText = winner + ' Wins!';
        if (winner == document.getElementById("name1").value) {
            scoreboard.player1++;
        } else if (winner == document.getElementById("name2").value) {
            scoreboard.player2++;
        }
        score.innerHTML = `
    <p>${document.getElementById("name1").value} : ${scoreboard.player1}</p>
    <p>${document.getElementById("name2").value} : ${scoreboard.player2}</p>
   `
    }
    winningMessageElement.classList.add('show')
}
//DEFINE DRAW FUNCTION
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}
// DEFINE PLACE MARK FUNCTION
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}
// DEFINE SWAP TURN FUNCTION
function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}
// DEFINE CHECK WIN FUNCTION
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
// Add players name to the game
function addName() {
    player1.innerHTML = document.getElementById("name1").value;
    player2.innerHTML = document.getElementById("name2").value;
}

function addGame() {
    gameboard.numOfGames++;
    totalGame.innerText = `Total Games Played: ${gameboard.numOfGames}`;
}
// ADD FUNCTIONS TO CHANGE PLAYING BETWEEN HUMAN AND COMPUTER

function showHuman() {
    document.getElementById("plyHuman").style.display = 'block';
    document.getElementById("img").style.display = 'none';
}

function showComputer() {
    document.getElementById("plyComputer").style.display = 'block';
    document.getElementById("plyHuman").style.display = 'none';
    document.getElementById("img").style.display = 'none';


}
//------------------------------------------------------------------
// PLAY WITH COMPUTER
//------------------------------------------------------------------


const winTitle = document.getElementById("winTitle");
const rematchBtn = document.getElementById("reMatch");
const items = document.querySelectorAll(".item");
const winContainer = document.getElementById("winContainer");
const drawCmptr = document.getElementById("drawCmptr");
const totalGameCmptr = document.getElementById("totalGameCmptr");
const gridArray = Array.from(items);
let tracking = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let currentPlayer = "playerX";
const scoreCmptr = document.getElementById('scoreCmptr');
const scoreBoardCmptr = {
    playerX: 0,
    Computer: 0
};
const gameBoardCmptr = {
    numOfDraws: 0,
    numOfGames: 0,
}

function init() {
    tracking = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    currentPlayer = "playerX";
    // looping through all the board items.
    items.forEach((item) =>
        item.addEventListener("click", (e) => {
            // Player Move
            const index = gridArray.indexOf(e.target);
            if (
                items[index].classList.contains("playerX") ||
                items[index].classList.contains("computer")
            ) {
                return;
            }

            items[index].classList.add("playerX");
            const spliceNr = tracking.indexOf(index + 1);
            // slicing out the move from the tracking list
            tracking.splice(spliceNr, 1);

            // win check for player
            if (winCheck("playerX", items)) {
                winTitle.innerHTML = "PlayerX Win!!🍻🎆🎇";
                winContainer.classList.add('show')
                scoreBoardCmptr.playerX++;
                scoreCmptr.innerHTML = `
                        <p> player X: ${scoreBoardCmptr.playerX}</p>
                        <p> Computer : ${scoreBoardCmptr.Computer}</p>`

                return;
            }

            // check for draw
            if (tracking.length === 0) {
                winTitle.innerHTML = " It's Draw";
                winContainer.classList.add('show');
                addDrawCmptr();
                return;
            }

            // Computer Move

            const random = Math.floor(Math.random() * tracking.length);
            const computerIndex = tracking[random];
            items[computerIndex - 1].classList.add("computer");

            // Splicing out the move from the tracking list
            tracking.splice(random, 1);

            // win check for the computer
            if (winCheck("computer", items)) {
                winTitle.innerHTML = "Computer Win!!🍻🎆🎇";
                winContainer.classList.add('show');
                scoreBoardCmptr.Computer++;
                scoreCmptr.innerHTML = `
                        <p> player X: ${scoreBoardCmptr.playerX}</p>
                        <p> Computer : ${scoreBoardCmptr.Computer}</p>`
                return;
            }
        })
    );


}
// win check function
function winCheck(player, items) {
    // let allItems = items;
    function check(pos1, pos2, pos3) {
        console.log(items);
        if (
            items[pos1].classList.contains(player) &
            items[pos2].classList.contains(player) &
            items[pos3].classList.contains(player)
        ) {
            return true;
        } else {
            return false;
        }
    }

    if (check(0, 3, 6)) return true;
    else if (check(1, 4, 7)) return true;
    else if (check(2, 5, 8)) return true;
    else if (check(0, 1, 2)) return true;
    else if (check(3, 4, 5)) return true;
    else if (check(6, 7, 8)) return true;
    else if (check(0, 4, 8)) return true;
    else if (check(2, 4, 6)) return true;
}

// initializing the game
init();
rematchBtn.addEventListener('click', removeShow)
rematchBtn.addEventListener('click', init);



// define removeShow() function
function removeShow() {
    // remove the SHOW screen
    winContainer.classList.remove('show');
    // remove all selections for previous play
    items.forEach(cell => {
            cell.classList.remove("playerX");
            cell.classList.remove("computer");
        })
        // add one number to TOTAL GAMES PLATED
    addGameCmptr()

}

// Define a function to add TOTAL GAME NUMBER
function addGameCmptr() {
    gameBoardCmptr.numOfGames++;
    totalGameCmptr.innerText = `Total Games Played: ${gameBoardCmptr.numOfGames}`;
}


// Define a function to add DRAW NUMBER
function addDrawCmptr() {
    gameBoardCmptr.numOfDraws++;
    drawCmptr.innerText = `Number of Draws: ${gameBoardCmptr.numOfDraws}`;
}