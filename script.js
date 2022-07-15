// Rule of thumb: if you only ever need ONE of something 
//(gameBoard, displayController), use a module. 
//If you need multiples of something (players!), 
//create them with factories.

//Think carefully about where each bit of logic should reside. 
//Each little piece of functionality should be able to fit 
// in the game, player or gameboard objects.



// eventlistener function IFFY?   ----start
const game = (() => {     // --game-- object to control game flow. 
    //EventListener for game boxes.
    const startGame = startFunction();
    function startFunction() {
        return(() => {
            document.querySelector('#startBtn').addEventListener('click', () => {
                console.log("works")

            });
        })();
    }

    document.querySelectorAll('.gameBox').forEach(item => {
        item.addEventListener('click', () =>{
            //item = gamebox.
        console.log(item)
        item.innerHTML = jim.piece ;
        
        })
    }); 
})();      //-----event end


// --gameBoard-- IIFE module. --------------!!
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
    const clearBoard = clearFunction();
    function clearFunction() {
        return (() => {
            document.querySelector('.reset').addEventListener('click', () => {
                box1.innerHTML = "";
                box2.innerHTML = "";
                box3.innerHTML = "";
                box4.innerHTML = "";
                box5.innerHTML = "";
                box6.innerHTML = "";
                box7.innerHTML = "";
                box8.innerHTML = "";
                box9.innerHTML = "";
            });
        })();
    }

return {box1, box2, box3, box4, box5, box6, box7, box8, box9, clearBoard};

})(); //IIFE END HERE --------------------!!



// --player-- Factory ~~~~~~~~~~~~~~#
function player(name, piece) {
    const getPiece = () => piece;
    return { name, piece, getPiece };
} //player Factory End here ~~~~~~~~~~~~~~#

const jim = player('jim', 'X');
const bob = player('bob', 'O')

console.log(jim.piece)
console.log(bob.piece)




//displayController = module


