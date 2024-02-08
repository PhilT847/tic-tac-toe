/* script.js */

const game = createGameController();

function createGameController() {

    const gameBoard = createGameBoard();
    const player1 = createPlayer("Player 1");
    const player2 = createPlayer("Player 2");
}

function createGameBoard() {

    const boardContainer = document.querySelector("hey");
    const boardValues = [];

    const resetBoard = () => {

        boardValues = [];

        for(let i = 0; i < 9; i++) {

            boardValues.push("empty");
        }
    };

    const updateVisual = () => {

    };
}

function createPlayer(name) {

    const pName = name;

    return { pName };
}
