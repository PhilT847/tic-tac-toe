/* script.js */

const game = createGameController();

function createGameController() {

    const gameBoard = createGameBoard();
    const player1 = createPlayer("Player 1");
    const player2 = createPlayer("Player 2");

    gameBoard.resetBoard();
}

function createGameBoard() {

    const boardContainer = document.querySelector("hey");
    const boardValues = [];
    const tiles = [];

    const resetBoard = () => {

        boardValues = [];

        for(let i = 0; i < 9; i++) {

            boardValues.push("empty");
            tiles.push(createTile());
        }

        updateVisual();
    };

    const updateVisual = () => {

        for(let i = 0; i < 9; i++) {

            tiles[i].setVisual();
        }
    };

    return {resetBoard, updateVisual};
}

function createTile() {

    const setVisual = (value) => {

        switch(value) {
            case "X":
                break;
            case "O":
                break;
            default:
                break;
        }
    };

    return { setVisual };
}

function createPlayer(name) {

    const pName = name;

    return { pName };
}
