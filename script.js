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
    this.name = name
    this.piece = piece
    this.turn = turn
    function playerInfo () {
        return {name, piece, turn, wins}
    }
return { name, piece, turn, wins, playerInfo };
} //player Factory End here ~~~~~~~~~~~~~~###



// --displayController-- IIFE module. --------------!!
const displayController = (() => {
    //get user info.
    //buuild players

    const user1name = document.getElementById('player1');
    const user1select = document.getElementById('player1select');

    

    function hello () {
        console.log("Hello", gameArray)
    } 
return {user1name, user1select,hello, };
})(); // ---- GameBoard funct IIFE END HERE ----!!




  // --- Main game function IIFE  ----- //
 // keeping all  game logic in this module keeps global scope clean
const gameBoard = (() => {
    const xClass = "X";
    const oClass = "O";
    const gameBoxs = document.querySelectorAll('[data-value]');
    const startButton = document.getElementById('startButton');
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

    startButton.addEventListener('click', buildGame);
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
        //remove show div message
    };

    function buildGame () {
        console.log(displayController.user1name.value)
    }

    function playRound(e) {
        const box = e.target;
        const currentClass = playTurn ? xClass : oClass
        console.log(e.target);
        placeMarker(box, currentClass); 
        if (checkWin(currentClass)) {
            console.log("Winner!")
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
            // winningmessageTextEle.innerText = `${currentClass} Wins`
            console.log(`${playTurn ? "O" : "X"} wins`)
        }
        // winningmessage.classList.add('show')
    };


    // ---- Game gunction Ends here ----//
return{}
})();
