const gameBoard = (() => {
    return {
        array: ["X", "X", "O", "O", "X", "X", "O", "O", "X"]
    };
})();

const Player = (marker) => {
    //let marker = mark;

    return {
        getMarker() {
            return marker; 
        }
    };
};

const displayController = (() => {
    const renderBoard = () => {
        document.querySelectorAll(".board").forEach((square, i) => {
            square.textContent = gameBoard.array[i];
        });
    }
    return {
        renderBoard
    };
})();