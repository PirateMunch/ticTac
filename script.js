//Player Factory 
function player(name, piece, turn) {
    let wins = 0;
    this.turn = turn;
    this.name = name;
    this.piece = piece;
return { name, piece, wins, turn};
} 

//display IIFE
const displayController = (() => {
    const submitButton = document.getElementById('submitButton');
    const startButton = document.getElementById('startButton');
    const resetButton = document.getElementById('resetButton');
    const userForm = document.getElementById('playSelect');
    const gameText = document.getElementById('gameText');
    let roundCount = 0;
    let playTurn;
    let user1;
    let user2;
    submitButton.addEventListener('click', showForm);
    resetButton.addEventListener('click', resetRound);
    startButton.addEventListener('click', startGame);

    function showForm () {
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

    // Begin game button   
    function startGame () {
        const user1name = document.getElementById('player1');
        const user1select = document.getElementById('player1select');
        const user2name = document.getElementById('player2');
        const user2select = document.getElementById('player2select');
        const user1play = Math.random();

        user1 = new player(user1name.value, user1select.value, user1play);
        user2 = new player(user2name.value, user2select.value);
        console.log(user1.name)
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
        if(user1.play > 0.5) {
            gameText.innerText = `${user1.name} won the coin toss to go first.\n---\nplace your marker : \n ${user1.piece}`
            if(user1.piece === "X") {
                playTurn = false
            } else {
                playTurn = true
            }
        } else {
            gameText.innerText = `${user2.name} won the coin toss to go first.\n---\nplace your marker : \n ${user2.piece}`
            if(user2.piece === "X") {
                playTurn = true
            } else {
                playTurn = false
            }
        }
        scoreText.innerText = ""
        roundCount = 0
    return user1, user2, roundCount, playTurn
    };

    //build gameboard play, and reset all variables at start
    function resetRound () {
        if(roundCount % 2 == 0 ) {
            playTurn = false 
            if(user1.piece === "X") {
                gameText.innerText = `New Round!\n ---\n${user2.name}'s turn to start`
            } else {
                gameText.innerText = `New Round!\n ---\n${user1.name}'s turn to start`
            }
        } else  {
            playTurn = true 
            if(user1.piece === "O") {
                gameText.innerText = `New Round!\n ---\n${user2.name}'s turn to start`
            } else {
                gameText.innerText = `New Round!\n ---\n${user1.name}'s turn to start`
            }
        }
    };
return {startGame, user1, user2}
})();

// gameBoard function 
const gameBoard = (() => {
    const gameBoxs = document.querySelectorAll('[data-value]');
    const scoreText = document.getElementById('scoreText');
    const xClass = "X";
    const oClass = "O";
    const winCombo = [
        [0, 3, 6], [0, 1, 2], [0, 4, 8],
        [1,  4, 7], [3 ,4 ,5], [2,4,6],
        [2, 5 ,  8], [6, 7, 8]
    ];
    let user1 = displayController.startGame().user1;
    let user2 = displayController.startGame().user2;
    let playTurn = displayController.startGame().playTurn;
    let roundCount = displayController.startGame().roundCount;
    // --gameBox Listeners
    gameBoxs.forEach(box => {
        box.classList.remove(oClass);
        box.classList.remove(xClass);
        box.innerText = "";
        box.addEventListener('click', playRound, {once : true});
    });

    function playRound(e) {
        const box = e.target;
        const currentClass = playTurn ? oClass : xClass 
        let oppersiteClass = playTurn ? xClass : oClass
        console.log(displayController.user1)
        placeMarker(box, currentClass); 
        if (checkWin(currentClass)) {
            if (currentClass == this.classList.value) {
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
            console.log(this.classList.value)
            if(currentClass == this.classList.value) {
                gameText.innerText = `'${currentClass}' was placed.\n---\n${user1.name}'s turn,\n place your '${oppersiteClass}'`
            }
            else {
                gameText.innerText = `'${currentClass}' was placed.\n---\n${user2.name}'s turn,\n place your '${oppersiteClass}'`
            }
        }
    };

    function swapTurns() {
        playTurn = !playTurn
    };

    function placeMarker (box, currentClass) {
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

return {playRound}
})();





