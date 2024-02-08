/* script.js */

const game = createGameController();

function createGameController() {

    const gameBoard = createGameBoard(this);

    const playerList = [];

    let currentPlayerIndex = 0;
    let currentPlayer = null;

    const getCurrentPlayerIndex = () => {

        return currentPlayerIndex;
    }

    const resetGame = () => {

        playerList = [];
        playerList.push(createPlayer("Player 1"));
        playerList.push(createPlayer("Player 2"));

        currentPlayerIndex = 0;
        currentPlayer = playerList[currentPlayerIndex];

        gameBoard.resetBoard();
    }

    const nextTurn = () => {

        currentPlayerIndex++;

        if(currentPlayerIndex > playerList.length) {

            currentPlayerIndex = 0;
        }

        currentPlayer = playerList[currentPlayerIndex];
    }

    // Start game by resetting
    resetGame();

    return { getCurrentPlayerIndex, resetGame, nextTurn };
}

function createGameBoard(gc) {

    const gameController = gc;
    const boardContainer = document.querySelector("board-container");
    const tiles = [];

    const resetBoard = () => {

        for(let i = 0; i < 9; i++) {

            tiles.push(createTile(boardContainer));
        }

        updateBoard();
    };

    const updateBoard = () => {

        for(let i = 0; i < 9; i++) {

            tiles[i].updateTile();
        }
    };

    return { gameController, boardContainer, resetBoard, updateBoard };
}

function createTile(gb) {

    // Create tile element and add to document
    const tileElement = document.createElement("button");
    tileElement.classList.add("tile");
    tileElement.addEventListener("click", placeChip());

    const gameBoard = gb;
    gameBoard.boardContainer.appendChild(tileElement);

    let value = -1;

    const placeChip = () => {

        value = gb.gameController.getCurrentPlayerIndex();

        updateTile();
    }

    const updateTile = () => {

        switch(value) {

            case 0:

                tileElement.style.backgroundColor = "red";
                break;

            case 1:

                tileElement.style.backgroundColor = "blue";
                break;

            default:

                tileElement.style.backgroundColor = "white";
                break;

        }
    };

    return { updateTile };
}

function createPlayer(name) {

    const pName = name;

    return { pName };
}
