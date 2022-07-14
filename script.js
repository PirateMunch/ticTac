// Rule of thumb: if you only ever need ONE of something 
//(gameBoard, displayController), use a module. 
//If you need multiples of something (players!), 
//create them with factories.

//Think carefully about where each bit of logic should reside. 
//Each little piece of functionality should be able to fit 
// in the game, player or gameboard objects.


// eventlistener function IFFY?   ----start
const game = (() => {
    let result;
    //EventListener for game boxes.
    document.querySelectorAll('.gameBox').forEach(item => {
        item.addEventListener('click', event =>{
        console.log(item.innerHTML)
        result = item.innerHTML;
        console.log(result)
        console.log(jim.piece) //good scope here!
        })
    });

     return{result}
  
})();      //-----event end

//---- factory wont invoke eventlistener? strange
// // eventlistener function Factory   ----start
// function game () {
   
//     //EventListener for game boxes.
//   const result =  document.querySelectorAll('.gameBox').forEach(item => {
//         item.addEventListener('click', event =>{
//         console.log(item.innerHTML)
//         boxshit = item.innerHTML;
//         console.log(result)
//         console.log(jim.piece) //good scope here!
//         })
//     });

//      return{result, boxshit}
  
// };    //-----event end Factory end


console.log (game.result)
console.log(game.boxshit)
// console.log(result)

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
    
    return {box1, box2, box3, box4, box5, box6, box7, box8, box9};
})(); //IFFY END HERE --------------------!!

// --player-- Factory ~~~~~~~~~~~~~~#
function player(name, piece) {
    const getPiece = () => piece;
    return { name, piece, getPiece };
} //player Factory End here ~~~~~~~~~~~~~~#

const jim = player('jim', 'X');
const bob = player('bob', 'O')

console.log(jim.piece)
console.log(bob.piece)


// --game-- object to control game flow. 

//displayController = module


