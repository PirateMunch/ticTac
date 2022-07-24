//Player Factory 
function player(name, piece, start) {
    let wins = 0;
    let round = 0;
    this.start = start;
    this.name = name;
    this.piece = piece;
    let turn;
return { name, piece, wins, start, round, turn};
} 

//display IIFE
const displayController = (() => {
    const submitButton = document.getElementById('submitButton');
    const startButton = document.getElementById('startButton');
    const resetButton = document.getElementById('resetButton');
    const userForm = document.getElementById('playSelect');
    const gameText = document.getElementById('gameText');
    const user1name = document.getElementById('player1');
    const user1select = document.getElementById('player1select');
    const user2name = document.getElementById('player2');
    const user2select = document.getElementById('player2select');
    const getUser1 = () => user1;
    const getUser2 = () => user2;
    let user1;
    let user2;
    submitButton.addEventListener('click', showForm);
    resetButton.addEventListener('click', resetRound);
    startButton.addEventListener('click', startGame);

    function showForm () {
        gameBoard.newBoard()
        if(startButton.style.display = "none") {
            userForm.style.display = "grid";
            startButton.style.display = "flex"; 
            submitButton.style.display = "none";
            gameText.style.display = "none";
        } else {
            userForm.style.display = "none";
            startButton.style.display = "flex"
            submitButton.style.display = "none"
        }
    };
    // Begin game button - get & make players
    function startGame () {
        const user1play = Math.random();
        user1 = new player(user1name.value, user1select.value, user1play);
        user2 = new player(user2name.value, user2select.value);
        // build gameText
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
        if (user1.start > 0.5) {
            if(user1.piece === "X") {
                user1.turn = true
            } else {
                user1.turn = false
            } 
            gameText.innerText = `${user2.name} won the coin toss to go first.\n---\nplace your marker : \n ${user2.piece}`
        } else {
            if(user1.piece === "O") {
                user1.turn = true
            } else {
                user1.turn = false
            }
            gameText.innerText = `${user1.name} won the coin toss to go first.\n---\nplace your marker : \n ${user1.piece}`
        }
        scoreText.innerText = "";
        user1.round = 0;
    return {user1, user2}
    };
    //build gameboard and reset all variables at start
    function resetRound () {
        gameBoard.newBoard()
        console.log(user1.turn)
        if(user1.turn === true) {
            if(user1.piece === "X") {
                gameText.innerText = `New Round!\n ---\n${user2.name}'s turn to start`
            } else {
                 gameText.innerText = `New Round!\n ---\n${user1.name}'s turn to start`
            }
        } else {
           if(user1.piece === "O") {
                user1.turn = true
                gameText.innerText = `New Round!\n ---\n${user1.name}'s turn to start`
           } else {
                user1.turn = true
                gameText.innerText = `New Round!\n ---\n${user2.name}'s turn to start`
           }
        } 
    };
return {startGame, getUser1, getUser2}
})();

// gameBoard function 
const gameBoard = (() =>  {
    const gameBoxs = document.querySelectorAll('[data-value]');
    const scoreText = document.getElementById('scoreText');
    const xClass = "X";
    const oClass = "O";
    const winCombo = [
        [0, 3, 6], [0, 1, 2], [0, 4, 8],
        [1, 4, 7], [3 ,4 ,5], [2, 4, 6],
        [2, 5, 8], [6, 7, 8]
    ];
    let user1;
    let user2;
    // --gameBox Listeners
    gameBoxs.forEach(box => {
        box.classList.remove(xClass, oClass)
        box.innerText = "";
        box.addEventListener('click', playRound, {once : true});
    });

    function playRound(e) {
        user1 = displayController.getUser1();
        user2 = displayController.getUser2();
        const box = e.target;
        const  currentClass = user1.turn ? oClass : xClass
        const oppersiteClass = user1.turn ? xClass : oClass
        placeMarker(box, currentClass); 
        if (checkWin(currentClass)) {
            if (currentClass == user1.piece) {
                gameText.innerText = `${currentClass}'s Win\n---\nWell done ${user1.name}!` 
                user1.wins = user1.wins +1
                user1.round = user1.round +1
                if (user1.piece === "X") {
                    user1.turn = true  
                } else {
                    user1.turn = false
                }
            }
            else {
                gameText.innerText = `${currentClass}'s Win\n---\nWell done ${user2.name}!` 
                user2.wins = user2.wins +1
                user1.round = user1.round +1
                if (user1.piece === "O") {
                    user1.turn = true
                } else {
                    user1.turn = false
                }
            }
            showScore ()
            endGame(false)  
        } else if (checkDraw()) {
            user1.round = user1.round + 1
            gameText.innerText = "It's a Draw! \n---\n Play again"
            if (currentClass === user1.piece) {
                user1.turn = false
            } else {
                user1.turn = true
            }
            showScore()
        } else {
            swapTurns()
            if(currentClass == user2.piece) {
                gameText.innerText = `'${currentClass}' was placed.\n---\n${user1.name}'s turn,\n place your '${oppersiteClass}'`
            }
            else {
                gameText.innerText = `'${currentClass}' was placed.\n---\n${user2.name}'s turn,\n place your '${oppersiteClass}'`
            }
        }
    };

    function swapTurns() {
        user1.turn = !user1.turn
    };

    function placeMarker (box, currentClass) {
        console.log(currentClass)
        box.classList.add(currentClass)
        box.innerText = currentClass
    return{box, currentClass}
    };
    //compare winCombo array to classList
    function checkWin(currentClass) {
        return winCombo.some(combination => {
            return combination.every(index => {
                return gameBoxs[index].classList.contains(currentClass)
            })
        })
    };
    //make gamebox an array to check if every box contains X or O
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
        } else {
            pauseClicks()
            check3wins()
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
    //Prevent board being clicked after win/draw
    function pauseClicks () {
        gameBoxs.forEach(box => {
            box.removeEventListener('click', playRound)
        })
    };

    function showScore () {
        if (user1.wins === 3 || user2.wins === 3) {
            scoreText.innerText = gameText.innerText
        }
        else {
            scoreText.innerText = `Current Round : ${user1.round}
            ${user1.name}'s wins : ${user1.wins}
            ${user2.name}'s wins : ${user2.wins}`
        }
    };

    function newBoard () {
        gameBoxs.forEach(box => {
        box.classList.remove(oClass, xClass);
        box.innerText = "";
        box.removeEventListener('click', playRound)
        box.addEventListener('click', playRound, { once : true})
        })
    }

return {playRound, newBoard, user1}
})();





