const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    return {
        board
    };
})();

const Player = (chosenMarker) => {
    let marker = chosenMarker;

    return {
        getMarker() {
            return marker; 
        }
    };
};

const gameController = (() => {
    const player1 = Player("X");
    const player2 = Player("O");
    let currentPlayer = player1;

    const getCurrentPlayer = () => currentPlayer;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const addMarker = (index, player) => {
        gameBoard.board[index] = player.getMarker();
    };

    const playRound = (index) => {
        if (gameBoard.board[index] !== "") return;
        addMarker(index, getCurrentPlayer());
        switchPlayer();
        console.log(gameBoard.board);
    };

    return {
        playRound
    };
})();

const displayController = (() => {
    const boardSquares = document.querySelectorAll(".board");

    const showBoard = () => {
        boardSquares.forEach((square, i) => {
            square.textContent = gameBoard.board[i];
        });
    };

    const clickHandler = (e) => {
        gameController.playRound(e.target.dataset.index);
        showBoard();
    };

    boardSquares.forEach(square => {
        square.addEventListener("click", clickHandler);
    });

    showBoard();
});

displayController();

// addMarker could go in game or player
// .board query selector can inside renderBoard
// renderBoard() can actually insert the elements, instead of just filling them, as just doing that doesn't make sense when the game starts
// 