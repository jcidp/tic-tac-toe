const GameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    return {
        board
    };
});

const Player = (chosenMarker, myName) => {
    let marker = chosenMarker;
    let name = myName;

    const getMarker = () => marker;

    const getName = () => name;

    return {
        getMarker,
        getName
    };
};

const gameController = (() => {
    let board = GameBoard().board;
    const player1 = Player("X", "Player 1");
    const player2 = Player("O", "Player 2");
    let currentPlayer = player1;
    let result = "";

    const getCurrentPlayer = () => currentPlayer;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const addMarker = (index, player) => {
        board[index] = player.getMarker();
    };

    const playRound = (index) => {
        if (board[index] !== "") return;
        let player = getCurrentPlayer();
        addMarker(index, player);
        checkGameOver(player);
        switchPlayer();
        console.log(board);
    };

    const checkGameOver = (player) => {
        let marker = player.getMarker();
        let winningCombinations = [
            board.slice(0,3),
            board.slice(3,6),
            board.slice(6,9),
            board.filter((e, i) => i % 3 === 0),
            board.slice(1).filter((e, i) => i % 3 === 0),
            board.slice(2).filter((e, i) => i % 3 === 0),
            [board[0], board[4], board[8]],
            [board[2], board[4], board[6]]
        ];
        if (winningCombinations.some(combination =>
            combination.every(value => value === marker))) endGame(player);
        else if (!board.some(square => square === "")) endGame();
    };

    const endGame = (winner) => {
        result = winner ? `${winner.getName()} wins!` : "It's a tie!"
        console.log(result);
        board.forEach((square, i) => {
            if (square === "") board[i] = " ";
        });
    };

    const resetGame = () => {
        board = GameBoard().board;
        result = "";
    };

    const getResult = () => result;
    const getBoard = () => board;

    return {
        playRound,
        getCurrentPlayer,
        switchPlayer,
        getResult,
        resetGame,
        getBoard
    };
})();

const displayController = (() => {
    const squareContainer = document.querySelectorAll(".square-container");
    const boardSquare = document.querySelectorAll(".board");
    const text = document.getElementById("game-text");
    const btn = document.getElementById("new-game");

    const showBoard = () => {
        boardSquare.forEach((square, i) => {
            square.textContent = gameController.getBoard()[i];
        });
        text.textContent = `It's ${gameController.getCurrentPlayer().getName()}'s turn...`;
    };

    const clickHandler = (e) => {
        gameController.playRound(e.target.dataset.index);
        showBoard();
        if (gameController.getResult() !== "") displayGameEnd();
    };

    const displayGameEnd = () => {
        text.textContent = gameController.getResult();
    };

    const resetBoard = () => {
        gameController.resetGame();
        showBoard();
        text.textContent = `It's ${gameController.getCurrentPlayer().getName()}'s turn...`;
    };

    squareContainer.forEach(square => {
        square.addEventListener("click", clickHandler);
    });

    btn.addEventListener("click", resetBoard);

    showBoard();
});

displayController();
