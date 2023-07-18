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

    const setName = (newName) => name = newName;

    return {
        getMarker,
        getName,
        setName
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

    const getPlayers = () => ({player1, player2});

    const getResult = () => result;
    const getBoard = () => board;

    return {
        playRound,
        getCurrentPlayer,
        switchPlayer,
        getResult,
        resetGame,
        getBoard,
        getPlayers
    };
})();

const displayController = (() => {
    const squareContainer = document.querySelectorAll(".square-container");
    const boardSquare = document.querySelectorAll(".board");
    const text = document.getElementById("game-text");
    const newGameBtn = document.getElementById("new-game");
    const nameEditBtn = document.querySelectorAll(".edit-name");
    const nameInputs = document.querySelectorAll(".name-input");
    const player1Text = document.getElementById(`player1`);
    const player2Text = document.getElementById(`player2`);

    const renderBoard = () => {
        boardSquare.forEach((square, i) => {
            square.textContent = gameController.getBoard()[i];
        });
        let playerName = gameController.getCurrentPlayer().getName();
        text.textContent = `It's ${playerName}'${playerName.slice(playerName.length - 1) == "s" ? "" : "s"} turn...`;
        player1Text.textContent = gameController.getPlayers().player1.getName();
        player2Text.textContent = gameController.getPlayers().player2.getName();
    };

    const clickHandler = (e) => {
        gameController.playRound(e.target.dataset.index);
        renderBoard();
        if (gameController.getResult() !== "") displayGameEnd();
    };

    const displayGameEnd = () => {
        text.textContent = gameController.getResult();
    };

    const resetBoard = () => {
        gameController.resetGame();
        renderBoard();
        let playerName = gameController.getCurrentPlayer().getName();
        console.log(playerName.slice(playerName.length - 1) == "s");
        text.textContent = `It's ${playerName}'${playerName.slice(playerName.length - 1) == "s" ? "s" : ""} turn...`;
    };

    const editName = (e) => {
        let playerNum = e.target.dataset.player;
        let playerText = document.getElementById(`player${playerNum}`);
        let playerInput = document.getElementById(`player${playerNum}-input`);
        playerInput.value = playerText.textContent;
        toggleVisibility(document.querySelectorAll(`.player${playerNum}`));
        playerInput.focus();
    };

    const confirmEdit = (e) => {
        let playerNum = e.target.dataset.player;
        let playerInput = document.getElementById(`player${playerNum}-input`);
        toggleVisibility(document.querySelectorAll(`.player${playerNum}`));
        if (!playerInput.value) return;
        let opponentName = gameController.getPlayers()[`player${playerNum == 1 ? 2 : 1}`].getName();
        if (playerInput.value === opponentName) return;
        gameController.getPlayers()[`player${playerNum}`].setName(playerInput.value);
        renderBoard();
    };

    const toggleVisibility = (elementList) => {
        elementList.forEach(element => element.classList.toggle("hidden"));
    };

    const keyHandler = (e) => {
        e.preventDefault();
        if (e.key === "Enter" || e.key === "Escape") e.target.blur();
    };

    squareContainer.forEach(square => {
        square.addEventListener("click", clickHandler);
    });
    newGameBtn.addEventListener("click", resetBoard);
    nameEditBtn.forEach(editor => editor.addEventListener("click", editName));
    nameInputs.forEach(input => input.addEventListener("focusout", confirmEdit));
    nameInputs.forEach(input => input.addEventListener("keyup", keyHandler));

    renderBoard();
});

displayController();
