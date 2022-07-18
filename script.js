// Rule of thumb: if you only ever need ONE of something 
//(gameBoard, displayController), use a module. 
//If you need multiples of something (players!), 
//create them with factories.

//Think carefully about where each bit of logic should reside. 
//Each little piece of functionality should be able to fit 
// in the game, player or gameboard objects.


// --player-- Factory ~~~~~~~~~~~~~~###
function player(name, piece, turn) {
    const wins = 0;
    this.turn = turn;
    this.name = name;
    this.piece = piece;
    function info() {
        return {name, piece, turn, wins}
    }
return { name, piece, wins, turn, info};
} //player Factory End here ~~~~~~~~~~~~~~###



// --displayController-- IIFE module. --------------!!
const displayController = (() => {
    //get user info.
    //buuild players
    const userForm = document.getElementById('playSelect');
    const beginButton = document.getElementById('startButton');
    const submitButton = document.getElementById('submitButton');
    const gameText = document.getElementById('gameText');
    const user1name = document.getElementById('player1');
    const user1select = document.getElementById('player1select');
    const user2name = document.getElementById('player2');
    const user2select = document.getElementById('player2select');
    const startButton = document.getElementById('startButton');
   
    startButton.addEventListener('click', buildGame);

    submitButton.addEventListener('click', showForm);

    //--start new game button--//
    function showForm () {
        if(userForm.style.display = "none") {
            userForm.style.display = "grid";
            beginButton.style.display = "flex"; 
            submitButton.style.display = "none";
            gameText.style.display = "none";
            //clear board here
            gameBoard.beginGame()
        }
    };

    //--begin game button --submit form user info / css tricks
    function buildGame () {
        const user1 = player(user1name.value, user1select.value);
        const user2 = player(user2name.value, user2select.value);
    
        console.log(user1.piece)

        console.log(user1.info[0])
        gameBoard.beginGame();
        if(userForm.style.display = "grid") {
           userForm.style.display = "none";
           beginButton.style.display = "none";
           submitButton.style.display = "flex";
           gameText.style.display = "flex";
        } else {
           userForm.style.display = "grid"
           gameText.innerText = "";
        }
        if(user1.turn = "X") {
            console.log(user1.turn)
            gameText.innerText = `${user1.name} you won the coin toss!\nplace your marker : \n ${user1.piece}`
        }
    };


    function hello () {
        console.log("Hello", gameArray)
    } 
return {buildGame, hello};
})(); // ---- GameBoard funct IIFE END HERE ----!!



  // --- Main game function IIFE  ----- //
 // keeping all  game logic in this module keeps global scope clean
const gameBoard = (() => {
    const xClass = "X";
    const oClass = "O";
    const gameBoxs = document.querySelectorAll('[data-value]');
    const gameText = document.getElementById('gameText');
    const resetButton = document.getElementById('resetButton');
    const winCombo = [
        [0, 3, 6], [0, 1, 2], [0, 4, 8],
        [1,  4, 7], [3 ,4 ,5], [2,4,6],
        [2, 5 ,  8], [6, 7, 8]
    ]

    let playTurn;

    //import player info

   
    //build game board play, and reset all variables at start
    beginGame()


    resetButton.addEventListener('click', beginGame);
    
    function beginGame () {
        playTurn = false
        
        // click eventListener that only allows 1 click on the div per reload
        gameBoxs.forEach(box => {
            //reset  board before new play thru
            box.classList.remove(oClass);
            box.classList.remove(xClass);
            box.innerText = "";
            box.removeEventListener('click', playRound);
            //new play thru
            box.addEventListener('click', playRound, {once : true});
        });
        gameText.style.display = "none"

    };

    function playRound(e) {
        const box = e.target;
        const currentClass = playTurn ? xClass : oClass
        console.log(e.target);
        placeMarker(box, currentClass); 
        if (checkWin(currentClass)) {
            console.log("Winner!")
            gameText.innerText = `${currentClass} Wins` 
            endGame(false)  
        } else if (checkDraw()) {
            console.log("DRAW")
        } else {
            swapTurns()
        }
    };
    
    // Swap current playTurn value != itself to invoke ternary next loop
    function swapTurns() {
        playTurn = !playTurn
    };

    // add X/O to board and push to boardArray
    function placeMarker (box, currentClass) {
        box.classList.add(currentClass)
        box.innerText = currentClass
    return{box, currentClass}
    };

    //compare winCombo array to box class list
    function checkWin(currentClass) {
        return winCombo.some(combination => {
            return combination.every(index => {
                return gameBoxs[index].classList.contains(currentClass)
            })
        })
    };

    //turn gameBox elements into an Array to use new array methods
    function checkDraw() {
        return [...gameBoxs].every(box => {
            return box.classList.contains(oClass) ||
            box.classList.contains(xClass)
        })
    };   

    function endGame(draw) {
        if (draw) {
            console.log("DRAW")
        }
        else {
            // gameText.innerText = `${currentClass} Wins`
            console.log(`${playTurn ? "X" : "O"} wins`)
        }
        // winningmessage.classList.add('show')
    };
    // ---- Game gunction Ends here ----//
return{beginGame}
})();





