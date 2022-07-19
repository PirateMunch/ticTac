
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
} //player Factory End here ~~~~//

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
    let roundCount = 0;
    let playTurn;
    let user1;
    let user2;

    submitButton.addEventListener('click', showForm);
    //--start new game button--//
    function showForm () {
        if(startButton.style.display = "none") {
            userForm.style.display = "grid";
            startButton.style.display = "flex"; 
            submitButton.style.display = "none";
            gameText.style.display = "none";
        }
        else {
            userForm.style.display = "none";
            startButton.style.display = "flex"
            submitButton.style.display = "none"
        }
    };

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
        if(user2.name == "") {
            console.log("YUPYUP")
            playAI()  // stop buildGame and jump to playAI
        }
        else {
        console.log(user2.piece)
        beginGame();
        //build gameText
        if(userForm.style.display = "grid") {
           userForm.style.display = "none";
           startButton.style.display = "none";
           submitButton.style.display = "flex";
           resetButton.style.display = "flex";
           gameText.style.display = "flex";
        } else {
           userForm.style.display = "grid"           
        }
        //assign random start - begin text
        if(user1.play > 0.5) {
            gameText.innerText = `${user1.name} won the coin toss to go first.\n---\nplace your marker : \n ${user1.piece}`
            if(user1.piece === "X") {
                playTurn = false
            }
            else {
                playTurn = true
            }
        }
        else {
            gameText.innerText = `${user2.name} won the coin toss to go first.\n---\nplace your marker : \n ${user2.piece}`
            if(user2.piece === "X") {
                playTurn = true
            }
            else {
                playTurn = false
            }
        }
        scoreText.innerText = ""
        roundCount = 0
    {return user1, user2}
        }
    };

    // -- playRound button --
    resetButton.addEventListener('click', beginGame);
    //build game board play, and reset all variables at start
    function beginGame () {
        if(roundCount % 2 == 0 ) {
            playTurn = false // "X"
                if(user1.piece === "X") {
                gameText.innerText = `New Round!\n ---\n${user2.name}'s turn to start`
            }
                else {
                    gameText.innerText = `New Round!\n ---\n${user1.name}'s turn to start`
                }
        }
        else  {
            playTurn = true // "O"
                if(user1.piece === "O") {
                    gameText.innerText = `New Round!\n ---\n${user2.name}'s turn to start`
                }
                else {
                    gameText.innerText = `New Round!\n ---\n${user1.name}'s turn to start`
                }
        }
        // click eventListener that only allows 1 click on the div per reload
        gameBoxs.forEach(box => {
                   //reset board 
                   box.classList.remove(oClass);
                   box.classList.remove(xClass);
                   box.innerText = "";
            box.addEventListener('click', playRound, {once : true});
        });
    };

    function playRound(e) {
        const box = e.target;
        const currentClass = playTurn ? xClass : oClass 
        let oppersiteClass = playTurn ? oClass : xClass

        placeMarker(box, currentClass); 
        if (checkWin(currentClass)) {
            if (currentClass == user1.piece) {
                gameText.innerText = `${currentClass}'s Win\n---\nWell done ${user1.name}!` 
                user1.wins = user1.wins +1
                roundCount = roundCount + 1
            }
            else {
                gameText.innerText = `${currentClass}'s Win\n---\nWell done ${user2.name}!` 
                user2.wins = user2.wins +1
                roundCount = roundCount +1
            }
            showScore ()
            endGame(false)  
        } else if (checkDraw()) {
            roundCount = roundCount + 1
            gameText.innerText = "It's a Draw! \n---\n Play again"
            showScore()
        } else {
            swapTurns()
            if(currentClass == user1.piece) {
                gameText.innerText = `'${currentClass}' was placed.\n---\n${user2.name}'s turn,\n place your '${oppersiteClass}'`
            }
            else {
                gameText.innerText = `'${currentClass}' was placed.\n---\n${user1.name}'s turn,\n place your '${oppersiteClass}'`
            }
        }
    };

    function showScore () {
        if (user1.wins === 3 || user2.wins === 3) {
            scoreText.innerText = gameText.innerText
        }
        else {
            scoreText.innerText = `Current Round : ${roundCount +1}
            ${user1.name}'s wins : ${user1.wins}
            ${user2.name}'s wins : ${user2.wins}`
        }
    };

    function check3wins () {
        if (user1.wins === 3) {
            gameText.innerText = `Start a new game!\n ---\n${user1.name} has won 3 games!`
            resetButton.style.display = "none"
        }
        if (user2.wins === 3) {
            gameText.innerText = `Start a new game!\n ---\n${user2.name} has won 3 games!`
            resetButton.style.display = "none"
        }
    };
    
    // Swap current playTurn value != itself to invoke ternary next loop
    function swapTurns() {
        playTurn = !playTurn
        aiTurn(playTurn)
    };

    // add X/O to board and push add to classlist of divbox
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
            pauseClicks()
            check3wins()
        }
        else {
            pauseClicks()
            check3wins()
        }
    };

    function pauseClicks () {
        gameBoxs.forEach(box => {
            box.removeEventListener('click', playRound)
        })
    };


    //  --- play AI function --
    function playAI () {
        console.log("AI GOO")

        const playerPiece = user1.piece
        if (playerPiece === "X") {
            compPiece = "O"
        } else {
            compPiece = "X"
        };

        user2 = player("Bob the Bot", compPiece)
        if(userForm.style.display = "grid") {
            userForm.style.display = "none";
            startButton.style.display = "none";
            submitButton.style.display = "flex";
            resetButton.style.display = "flex";
            gameText.style.display = "flex";
         } else {
            userForm.style.display = "grid"           
         }
         //assign random start - begin text
         if(user1.play > 0.5) {
             gameText.innerText = `${user1.name} won the coin toss to go first.\n---\nplace your marker : \n ${user1.piece}`
             if(user1.piece === "X") {
                 playTurn = false
             }
             else {
                 playTurn = true
             }
         }
         else {
             gameText.innerText = `${user2.name} won the coin toss to go first.\n---\nplace your marker : \n ${user2.piece}`
             if(user2.piece === "X") {
                 playTurn = true
             }
             else {
                 playTurn = false
             }
         }
         console.log(user2.name)
         beginGame()
    }

    function aiTurn () {
        if (user2.piece === "O" && playTurn === true) {
        console.log("DO S TUFF COMP")
        }
        if (user2.piece === "X" && playTurn === false) {
            console.log("GO COMMP CO")
        }
        // loop classlist array to find move...
    }
    // ---- Game gunction Ends here ----//
})();





