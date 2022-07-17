// Rule of thumb: if you only ever need ONE of something 
//(gameBoard, displayController), use a module. 
//If you need multiples of something (players!), 
//create them with factories.

//Think carefully about where each bit of logic should reside. 
//Each little piece of functionality should be able to fit 
// in the game, player or gameboard objects.



// eventlistener function IFFY?   ----start
const game = (() => {     // --game-- object to control game flow. 
    

    // --- user Input logic here --- //
    document.querySelectorAll('.gameBox').forEach(item => {
        item.addEventListener('click', () =>{
        const gameDisplay = gameboard.gameArray;
        const player = gameboard.submitFunction();
        console.log(event)

        const user1 = player.thisPlayer1;
        const user2 = player.thisPlayer2;
        //random player goes first, --tell ui this
        const randomStart = ['true', 'false'][Math.round(Math.random())];
        
        
        console.log(gameDisplay[0])
        console.log(item.innerText)

        const playGame = (() => {
            user1.turn = randomStart
        if (user1.turn == "true" ) {
            item.innerText = user1.piece
            console.log("BOB")
        } 
        else {
            item.innerText = user2.piece
            console.log("BILLY")
        }   //else always fires here----


            getWin = "ME"

        {return getWin}
        })();

 

        
        })
    }); 

    // --- test button --- //

    document.querySelector('#testbox').addEventListener('click', () => {
        const gameDisplay = gameboard.gameArray;
        console.log(gameDisplay)

        gameDisplay.forEach(thisFunction);
        function thisFunction(item) {
            // console.log(item)
            console.log()
        }
    });
    
})();      //-----event end


// --gameBoard-- IIFE module. --------------!!
//need an Array
const gameboard = (() => {
    const box1 = document.getElementById('box1');
    const box2 = document.getElementById('box2');
    const box3 = document.getElementById('box3');
    const box4 = document.getElementById('box4');
    const box5 = document.getElementById('box5');
    const box6 = document.getElementById('box6');
    const box7 = document.getElementById('box7');
    const box8 = document.getElementById('box8');
    const box9 = document.getElementById('box9');    
    const gameArray = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

    disableForm();
    function disableForm() {
        let element = document.querySelector('#submitBtn') !== null;
        if (element) {
        document.querySelector('#submitBtn').addEventListener('click',() => {   
        bobit = gameboard.submitFunction();
        console.log(bobit.thisPlayer1.piece)
        document.getElementById('playSelect').innerHTML = ""
        alert("Finiish Game or Reset Game")
        })} else {
            console.log("do stuff")
        }

    };
    
    document.querySelector('#startBtn').addEventListener('click', () => {
        const gameDisplay = gameboard.gameArray;

        let formInfo = document.querySelector('#select1') !== null;
        if (formInfo) {
            console.log("WELLL")
            console.log(this)
            console.log(formInfo)
            resetForm()
            alert("hit Reset Board until I can fix this! Simply banging my ResetForm function here doesnt work!! some Closuer issue i think....")
        } 
        else {
        
    

        document.getElementById('startBtn').style.display = "none";
        document.getElementById('playSelect').style.display = "grid";

        console.log(submitFunction.user1select)
        // if(user1select === "X" || "O") {
        //     alert("Reset Board or Finish Game")
        // } else {
            
        // }
        // clear game board
        gameDisplay.forEach(thisFunction);
            function thisFunction(item) {
            item.innerHTML = "";
            console.log(item.innerHTML);
            }

        const playDiv = document.getElementById('playSelect');
        const divPlay1 = document.createElement('div');
        divPlay1.className = "play1";
        playDiv.appendChild(divPlay1);

        const label1 = document.createElement('label');
        const forLabel1 = document.createAttribute('for');
        forLabel1.value = "player1";
        label1.setAttributeNode(forLabel1);
        label1.innerHTML = "player 1";
        divPlay1.appendChild(label1);

        const input1 = document.createElement('input');
        input1.type = "text";
        input1.id = "player1";
        input1.className = "player";
        input1.placeholder = "enter name";
        divPlay1.appendChild(input1);

        const select1 = document.createElement('select');
        select1.name = "icon1";
        select1.id = "select1";
        divPlay1.appendChild(select1);

        const option1pick = document.createElement('option');
        option1pick.value = "O";
        option1pick.innerText = "-- Pick X / O --";
        select1.appendChild(option1pick);

        const option1x = document.createElement('option');
        option1x.value = "X";
        option1x.innerText = "X";
        select1.appendChild(option1x);

        const option1o = document.createElement('option');
        option1o.value = "O";
        option1o.innerText = "O";
        select1.appendChild(option1o);

        // player 2 UI options
        const divPlay2 = document.createElement('div');
        divPlay2.className = "play2";
        playDiv.appendChild(divPlay2);

        const label2 = document.createElement('label');
        const forLabel2 = document.createAttribute('for');
        forLabel2.value = "player2";
        label2.setAttributeNode(forLabel2);
        label2.innerHTML = "player 2";
        divPlay2.appendChild(label2);

        const input2 = document.createElement('input');
        input2.type = "text";
        input2.id = "player2";
        input2.className = "player";
        input2.placeholder = "enter name";
        divPlay2.appendChild(input2);

        const select2 = document.createElement('select');
        select2.name = "icon2";
        select2.id = "select2";
        divPlay2.appendChild(select2);

        const option2pick = document.createElement('option');
        option2pick.value = "O";
        option2pick.innerText = "-- Pick X / O --";
        select2.appendChild(option2pick);

        const option2x = document.createElement('option');
        option2x.value = "X";
        option2x.innerText = "X";
        select2.appendChild(option2x);

        const option2o = document.createElement('option');
        option2o.value = "O";
        option2o.innerText = "O";
        select2.appendChild(option2o);

        const submitBtn = document.createElement('button');
        submitBtn.type = "submit";
        submitBtn.id = "submitBtn";
        submitBtn.innerText = "Begin Game";
        playDiv.appendChild(submitBtn);
        }
        // form UI END ----
            
    function resetForm() {
        const gameDisplay = gameboard.gameArray;
        console.log("works")
        console.log(gameDisplay)
        // toggle + clear form on reset.
        document.getElementById('startBtn').style.display = "flex";
        document.getElementById('playSelect').style.display = "none";
        }

    document.getElementById('submitBtn').addEventListener('click', () => {
       submitFunction();
       resetForm();
        })
   }) // --start button end
 

                // --- Begin Game button --- // 
            
    function submitFunction() {                
        const user1 = document.getElementById("player1").value;
        const user2 = document.getElementById("player2").value;
        const user1select = document.getElementById("select1").value;
        const user2select = document.getElementById("select2").value;
      
        //get form info and make players
        const thisPlayer1 = player(user1, user1select);
        const thisPlayer2 = player(user2, user2select);
        

        return {thisPlayer1, thisPlayer2, user1select} 
    
        };
                

        
        // --- Reset Board --- //
        resetBoard();
        function resetBoard() {
            return (() => {
                document.querySelector('.reset').addEventListener('click', () => {
                const gameDisplay = gameboard.gameArray;
                console.log("works")
                console.log(gameDisplay)
                // toggle + clear form on reset.
                document.getElementById('startBtn').style.display = "flex";
                document.getElementById('playSelect').style.display = "none";
                document.getElementById('playSelect').innerHTML = ""
                    
                gameDisplay.forEach(thisFunction);
                    function thisFunction(item) {
                        item.innerHTML = "";
                        console.log(item.innerHTML)
                    }});
                })();
            };
        

return {box1, box2, box3, box4, box5, box6, box7, box8, box9, gameArray, submitFunction};
   
})(); //IIFE END HERE --------------------!!



// --player-- Factory ~~~~~~~~~~~~~~#
function player(name, piece, turn) {
    const wins = 0;
    function getPiece() 
        {return piece}

return { name, piece, turn, wins, getPiece };
} //player Factory End here ~~~~~~~~~~~~~~#

