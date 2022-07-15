// Rule of thumb: if you only ever need ONE of something 
//(gameBoard, displayController), use a module. 
//If you need multiples of something (players!), 
//create them with factories.

//Think carefully about where each bit of logic should reside. 
//Each little piece of functionality should be able to fit 
// in the game, player or gameboard objects.



// eventlistener function IFFY?   ----start
const game = (() => {     // --game-- object to control game flow. 
    
    // --- Start Game --- //
    document.querySelector('#startBtn').addEventListener('click', () => {
        const gameDisplay = gameboard.gameArray;
        console.log("works")
        console.log(gameDisplay)
        // clear game board
        gameDisplay.forEach(thisFunction);
        function thisFunction(item) {
            item.innerHTML = "";
            console.log(item.innerHTML)
        }
    //- form UI playDiv
            const playDiv = document.getElementById('playSelect');
            // player 1 UI options
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
            select1.id = "player1";
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
            select2.id = "player2";
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
            playDiv.appendChild(submitBtn)

    // form UI END ----

        

        
        // create random who goes first.
        // create players here from form.
    });

    // --- user Input logic here --- //
    document.querySelectorAll('.gameBox').forEach(item => {
        item.addEventListener('click', () =>{
        //item = gamebox.
        const gameDisplay = gameboard.gameArray;
        console.log(item)
        console.log(jim)

        if(jim.turn === true) {
            item.innerHTML = jim.piece

        } else {
            item.innerHTML = bob.piece
        }
         console.log(gameDisplay)
        
        })
    }); 

    // --- test button --- //

    document.querySelector('#testbox').addEventListener('click', () => {
        const gameDisplay = gameboard.gameArray;
        console.log(gameDisplay)

        gameDisplay.forEach(thisFunction);
        function thisFunction(item) {
            console.log(item)
        }
    });

    // --- Reset Board --- //
    resetFunction();
    function resetFunction() {
        return (() => {
            document.querySelector('.reset').addEventListener('click', () => {
            const gameDisplay = gameboard.gameArray;
            console.log("works")
            console.log(gameDisplay)
            
            gameDisplay.forEach(thisFunction);
                function thisFunction(item) {
                    item.innerHTML = "";
                    console.log(item.innerHTML)
            }});
        })();
    };


    
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
return {box1, box2, box3, box4, box5, box6, box7, box8, box9, gameArray};

})(); //IIFE END HERE --------------------!!



// --player-- Factory ~~~~~~~~~~~~~~#
function player(name, piece, turn) {
    const wins = 0;
    function getPiece() 
        {return piece}

return { name, piece, turn, wins, getPiece };
} //player Factory End here ~~~~~~~~~~~~~~#

const jim = player('jim', 'X', true);
const bob = player('bob', 'O', false)

console.log(jim.piece)
console.log(bob.piece)







