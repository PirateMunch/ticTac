// -- 1 --store gameboard as Array inside a Gameboard object
//players in objects
//object to control flow of game

const player = (name, piece ) => {
    
    const getPiece = () => piece;

    const sayHello = () => console.log('Hello');
    return {name, piece, getPiece, sayHello};
};

const jim = player('jim', 'X');

console.log(jim.getPiece)





// -- 2 -- set up html with function that will render the contents
// of the gameboard Array to webpage. fill array with test 'X''O'