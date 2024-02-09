/* script.js */

let currentPlayerIndex = 0;

// IIFE / module pattern for game controller
const gameController = (function () {

    const gameBoard = createGameBoard();
    let playerList = [];
    let currentPlayerIndex = 0;
    let currentPlayer = null;

    const resetGame = () => {

        playerList = [];
        playerList.push(createPlayer("Player 1"));
        playerList.push(createPlayer("Player 2"));

        currentPlayerIndex = 0;
        currentPlayer = playerList[currentPlayerIndex];
    }

    const nextTurn = () => {

        let prev = currentPlayerIndex;

        currentPlayerIndex++;

        if(currentPlayerIndex > playerList.length) {

            currentPlayerIndex = 0;
        }

        currentPlayer = playerList[currentPlayerIndex];
    }

    return { currentPlayerIndex, resetGame, nextTurn };

})();

function createGameBoard() {

    let tiles = [];

    const buildBoard = () => {

        tiles = [];

        for(let i = 0; i < 9; i++) {

            const newTile = createTile();

            tiles.push(newTile);
        }

        updateBoard();
    }

    const updateBoard = () => {

        for(let i = 0; i < tiles.length; i++) {

            tiles[i].updateTile();
        }
    };

    buildBoard();

    return { tiles, updateBoard };
}

function createTile() {

    const boardContainer = document.querySelector(".board-container");
    const tileElement = document.createElement("button");
    let value = -1;
    
    const placeChip = () => {

        value = gameController.currentPlayerIndex;

        updateTile();

        gameController.nextTurn();
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

                tileElement.style.backgroundColor = "var(--off-white)";
                break;

        }
    };

    tileElement.classList.add("tile");
    tileElement.addEventListener("click", placeChip);
    boardContainer.appendChild(tileElement);

    return { boardContainer, tileElement, placeChip, updateTile };
}

function createPlayer(name) {

    const pName = name;

    return { pName };
}
