// Rule of thumb: if you only ever need ONE of something 
//(gameBoard, displayController), use a module. 
//If you need multiples of something (players!), 
//create them with factories.

//Think carefully about where each bit of logic should reside. 
//Each little piece of functionality should be able to fit 
// in the game, player or gameboard objects.


// --player-- Factory ~~~~~~~~~~~~~~###
function player(name, piece, turn) {
    let wins = 0;
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
    const startButton = document.getElementById('startButton');
    const submitButton = document.getElementById('submitButton');
    const gameText = document.getElementById('gameText');

    

    submitButton.addEventListener('click', showForm);

    //--start new game button--//
    function showForm () {
        if(userForm.style.display = "none") {
            userForm.style.display = "grid";
            startButton.style.display = "flex"; 
            submitButton.style.display = "none";
            gameText.style.display = "none";
            //clear board here
            gameBoard.beginGame()
        }
    };



    

    function hello () {
        console.log("Hello", gameArray)
    } 
return {hello};
})(); // ---- GameBoard funct IIFE END HERE ----!!



  // --- Main game function IIFE  ----- //
 // keeping all  game logic in this module keeps global scope clean
const gameBoard = (() => {
    const startButton = document.getElementById('startButton');
    const userForm = document.getElementById('playSelect');
    const submitButton = document.getElementById('submitButton');
    const scoreText = document.getElementById('scoreText');
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

    let roundCount;
    let playTurn;
    let user1;
    let user2;

    //import player info
    startButton.addEventListener('click', buildGame);

        //--begin game button --submit form user info / css tricks
    function buildGame () {
        const user1name = document.getElementById('player1');
        const user1select = document.getElementById('player1select');
        const user2name = document.getElementById('player2');
        const user2select = document.getElementById('player2select');
        const user1play = Math.random();
        user1 = player(user1name.value, user1select.value, user1play);
        user2 = player(user2name.value, user2select.value);
    
        console.log(user1.piece)

        console.log(user1.info)
        beginGame();
        //build gameText
        if(userForm.style.display = "grid") {
           userForm.style.display = "none";
           startButton.style.display = "none";
           submitButton.style.display = "flex";
           gameText.style.display = "flex";
        } else {
           userForm.style.display = "grid"           
        }
        //assign random start - begin text
        if(user1.play > 0.5) {
            gameText.innerText = `${user1.name} won the coin toss to go first.\n---\nplace your marker : \n ${user1.piece}`
            user1.turn = true;
            user2.turn = false;
        }
        else {
            gameText.innerText = `${user2.name} won the coin toss to go first.\n---\nplace your marker : \n ${user2.piece}`
            user2.turn = true;
            user1.turn = false;
        }
        scoreText.innerText = ""
        roundCount = 0
    {return user1, user2}
    };

    resetButton.addEventListener('click', beginGame);

    
    //build game board play, and reset all variables at start
    beginGame()
    function beginGame () {
        if(user1.turn > 0.5) {
            playTurn = false
        } 
        else {
            playTurn = true
        }
        
        // click eventListener that only allows 1 click on the div per reload
        gameBoxs.forEach(box => {
                   //reset board 
                   box.classList.remove(oClass);
                   box.classList.remove(xClass);
                   box.innerText = "";
                   
            //new play thru
    
            box.addEventListener('click', playRound, {once : true});
        });
        gameText.innerText = "New Round!"
    };

    function playRound(e) {


        const box = e.target;
        const currentClass = playTurn ? xClass : oClass 
        let oppersiteClass = playTurn ? oClass : xClass
        console.log(e.target);
        placeMarker(box, currentClass); 
        if (checkWin(currentClass)) {
            if (currentClass == user1.piece) {
                gameText.innerText = `${currentClass}'s Win\nWell done ${user1.name}!` 
                user1.wins = user1.wins +1
                roundCount = roundCount + 1
            }
            else {
                gameText.innerText = `${currentClass}'s Win\nWell done ${user2.name}!` 
                user2.wins = user2.wins +1
                roundCount = roundCount +1
            }
            showScore ()
            endGame(false)  
        } else if (checkDraw()) {
            roundCount = roundCount + 1
            gameText.innerText = "It's a Draw! \n Play again"
            showScore()
        } else {
            swapTurns()
            if(currentClass == user1.piece) {
                gameText.innerText = `${user1.name} has placed their '${currentClass}'\n---\n${user2.name}'s turn,\n place your '${oppersiteClass}'`
            }
            else {
                gameText.innerText = `${user2.name} has placed their '${currentClass}'\n---\n${user1.name}'s turn,\n place your '${oppersiteClass}'`
            }
        }
    };


    function showScore () {
        if (user1.wins === 3 || user2.wins === 3) {
            scoreText.innerText = gameText.innerText
        }
        else {
            scoreText.innerText = `Current Round : ${roundCount +1}\n
            ${user1.name}'s wins : ${user1.wins}
            ${user2.name}'s wins : ${user2.wins}`
        }
    };

    function check3wins () {
        if (user1.wins === 3) {
            gameText.innerText = `Start a new game!\n ${user1.name} has won 3 games!`
        }
        if (user2.wins === 3) {
            gameText.innerText = `Start a new game!\n ${user2.name} has won 3 games!`
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
            pauseClicks()
            check3wins()
            swapTurns()
        }
        else {
            // gameText.innerText = `${currentClass} Wins`
            console.log(`${playTurn ? "X" : "O"} wins`)
            console.log(user1.wins)
            console.log(user2.wins)
            pauseClicks()
            check3wins()
            swapTurns()
        }
        // winningmessage.classList.add('show')
    };

    function pauseClicks () {
        gameBoxs.forEach(box => {
            box.removeEventListener('click', playRound)
        })
    }
    // ---- Game gunction Ends here ----//
return{beginGame}
})();





