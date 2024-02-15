/* script.js */

let currentPlayerIndex = 0;

// IIFE / module pattern for game controller
const gameController = (function () {

    // Board
    let tiles = [];
    const gameBoard = createGameBoard();

    // Players
    let playerList = [];

    // Dialog and containers
    let dialog = document.querySelector(".names-dialog");
    let playerOneInput = document.getElementById("player1");
    let playerTwoInput = document.getElementById("player2");
    let currentTurnContainer = document.querySelector(".current-turn");

    // Game won
    let gameComplete = false;

    const generateDialog = () => {

        let namesBtn = document.querySelector(".names-button");
        let submitBtn = document.querySelector(".dialog-submit");

        // Set initial values
        playerOneInput.value = "Player 1";
        playerTwoInput.value = "Player 2";
    
        namesBtn.addEventListener("click", () => {
    
            dialog.showModal();
        });
    
        submitBtn.addEventListener("click", submitNames, false);
    }
    
    const submitNames = (event) => {
    
        // Prevent default dialog closure
        event.preventDefault();

        // Set defaults if input is empty
        if(playerOneInput.value.length < 1) {

            playerOneInput.value = "Player 1";
        }

        if(playerTwoInput.value.length < 1) {

            playerTwoInput.value = "Player 2";
        }

        resetGame(playerOneInput.value, playerTwoInput.value);

        dialog.close();
    }
    
    const setResetButton = () => {
    
        let resetBtn = document.querySelector(".reset-button");
    
        resetBtn.addEventListener("click", () => {
    
            resetGame(playerList[0].pName, 
                        playerList[1].pName);
        });
    }

    const resetGame = (name1, name2) => {

        gameComplete = false;

        playerList = [];
        playerList.push(createPlayer(name1));
        playerList.push(createPlayer(name2));

        currentPlayerIndex = 0;

        // Build a new board
        gameBoard.buildBoard();

        // Set initial top text
        currentTurnContainer.style.backgroundColor = "#ED411C";
        currentTurnContainer.textContent = playerList[0].pName 
                                            + ", please place an O.";
    }

    const nextTurn = () => {

        let prev = currentPlayerIndex;

        currentPlayerIndex++;

        if(currentPlayerIndex >= playerList.length) {

            currentPlayerIndex = 0;
        }

        checkForWinner();
        setTopText();
    }

    const setTopText = () => {

        // If the game's over, do not fill in
        if(gameComplete) {

            return;
        }

        let newText = playerList[currentPlayerIndex].pName;

        switch(currentPlayerIndex) {

            case 0:

                currentTurnContainer.style.backgroundColor = "#ED411C";
                newText += ", please place an O.";
                break;

            case 1: 

                currentTurnContainer.style.backgroundColor = "#666DE9";
                newText += ", please place an X.";
                break;
        }

        currentTurnContainer.textContent = newText;
    }

    const checkForWinner = () => {
        
        // Winner index
        let winner = -1;

        // Horizontal (012, 345, 678)
        for(let i = 0; i < 7; i += 3) {

            if(tiles[i].getValue() != -1
                && tiles[i].getValue() == tiles[i+1].getValue()
                && tiles[i+1].getValue() == tiles[i+2].getValue()) {
                
                winner = tiles[i].getValue();

                for(let j = i; j < i+3; j++) {

                    tiles[j].displayWin();
                }
            }
        }

        // Vertical (036, 147, 258)
        for(let i = 0; i < 3; i++) {

            if(tiles[i].getValue() != -1
                && tiles[i].getValue() == tiles[i+3].getValue()
                && tiles[i+3].getValue() == tiles[i+6].getValue()) {
                
                winner = tiles[i].getValue();

                for(let j = i; j < 9; j += 3) {

                    tiles[j].displayWin();
                }
            }
        }

        // Diagonal (048, 246)
        if(tiles[0].getValue() != -1
            && tiles[0].getValue() == tiles[4].getValue()
            && tiles[4].getValue() == tiles[8].getValue()) {

            winner = tiles[0].getValue();

            tiles[0].displayWin();
            tiles[4].displayWin();
            tiles[8].displayWin();
        }
        
        if(tiles[2].getValue() != -1
            && tiles[2].getValue() == tiles[4].getValue()
            && tiles[4].getValue() == tiles[6].getValue()) {

            winner = tiles[2].getValue();

            tiles[2].displayWin();
            tiles[4].displayWin();
            tiles[6].displayWin();
        }

        // Winner found
        if(winner != -1) {

            gameComplete = true;

            let winText = playerList[winner].pName;

            if(winner == 0) {
                currentTurnContainer.style.backgroundColor = "#ED411C";
            }
            else {
                currentTurnContainer.style.backgroundColor = "#666DE9";
            }
            
            winText += " wins!";

            currentTurnContainer.textContent = winText;
        }
    }

    function createGameBoard() {

        const buildBoard = () => {
    
            tiles = [];
    
            // Remove all tile children from board
            let board = document.querySelector(".board-container");
    
            while(board.firstChild) {
    
                board.removeChild(board.lastChild);
            }
    
            // Create new tiles
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
    
        return { buildBoard, updateBoard };
    }

    function createTile() {

        const boardContainer = document.querySelector(".board-container");
        const tileElement = document.createElement("button");
        tileElement.classList.add("tile");
        let value = -1;
        
        const placeChip = () => {
    
            // If the tile is already filled, prevent filling
            // Also prevents next turn
            if(value != -1 || gameComplete) {
    
                return;
            }
    
            value = currentPlayerIndex;
    
            updateTile();
    
            nextTurn();
        }
    
        const updateTile = () => {
    
            let imageElement = document.createElement("img");
    
            switch(value) {
    
                case 0:
    
                    imageElement.src = "./images/circle-outline.svg";
                    break;
    
                case 1:
    
                    imageElement.src = "./images/window-close.svg";
                    break;
            }
    
            tileElement.appendChild(imageElement);
        };

        function getValue() {

            return value;
        }
    
        const displayWin = () => {
    
            tileElement.style.backgroundColor = "rgb(180,250,180)";
        }
    
        tileElement.classList.add("tile");
        tileElement.addEventListener("click", placeChip);
        boardContainer.appendChild(tileElement);
    
        return { getValue, displayWin, updateTile };
    }

    // Names and reset buttons
    generateDialog();
    setResetButton();

    // Reset/begin game
    resetGame("Player 1", "Player 2");

    return { gameBoard, playerList, resetGame, nextTurn };

})();

function createPlayer(name) {

    const pName = name;

    return { pName };
}