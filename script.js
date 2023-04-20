"use strict";
/* ------------- all elements on the page ------------- */
const gameInfoContainer = document.querySelector(".game-info-container");
const overlay = document.querySelector(".overlay");
// Dice Image
const diceImage = document.querySelector(".dice-image");
const winModal = document.querySelector(".win-modal");
// buttons
const playAgainButton = document.querySelectorAll(".play-again-button");
const rollDiceButton = document.querySelector(".roll-dice-button");
const holdButton = document.querySelector(".hold-button");
const showGameInfo = document.querySelector(".show-game-info");
const closeGameInfo = document.querySelector(".close-the-modal");

/* ------------- functions ------------- */

// Generate Random Number Between 1 - 6 ( Dice Faces )
const generateRandomDiceNumber = function () {
    return Math.trunc(Math.random() * 6 + 1);
};

// Change The Image of The Dice
const changeDiceImage = function (number) {
    diceImage.src = `./imgs/dice-${number}.png`;
    showDice();
};

// Showing the Dice When The Players Start Playing
const showDice = function () {
    diceImage.classList.add("active");
};

// Hide it when the click play again
const hideDice = function () {
    diceImage.classList.remove("active");
};

// Roll The Dice
const rollDice = function () {
    const number = generateRandomDiceNumber();
    changeDiceImage(number);

    if (number === 1) {
        playingNow.updateCurrentScore(-1);
        playingNow.changeCurrentScoreText();
        changePlayer(playerTurn);
    } else {
        playingNow.updateCurrentScore(number);
        playingNow.changeCurrentScoreText();
    }
};

const holdGameButton = function (playerTurn) {
    playingNow.updateScore();
    playingNow.changeScoreText();
    playingNow.resetCurrentScore();
};

const changePlayerContainer = function () {};
const changePlayer = function (currentTurn) {
    if (currentTurn === 1) {
        playingNow.playerContainer.classList.remove("turn");
        playingNow = playerTwo;
        playerTurn = 2;
        playingNow.playerContainer.classList.add("turn");
    } else if (currentTurn === 2) {
        playingNow.playerContainer.classList.remove("turn");
        playingNow = playerOne;
        playerTurn = 1;
        playingNow.playerContainer.classList.add("turn");
    }
};

const checkForWinner = function (playingNow) {
    if (playingNow.score >= 100) {
        document.querySelector(
            ".win-message"
        ).textContent = `Congrats ${playingNow.name} You Win 🎉🎊`;
        winModal.classList.add("active");
        overlay.classList.add("active");
    }
};

// function Create Player
const createPlayer = function (elementName, name) {
    const player = {
        name: name,
        player: elementName,
        score: 0,
        currentScore: 0,

        // This Will update The Score in The Object After Each Reroll
        updateCurrentScore: function (number) {
            if (number !== -1) {
                this.currentScore = this.currentScore + number;
            } else {
                this.currentScore = 0;
            }
        },

        updateScore: function () {
            this.score = this.score + this.currentScore;
        },

        // This Method Used After each Dice Rolling
        changeScoreText: function () {
            this.scoreElement.textContent = this.score;
        },
        changeCurrentScoreText: function () {
            this.currentScoreElement.textContent = this.currentScore;
        },

        resetCurrentScore: function () {
            this.currentScore = 0;
            this.currentScoreElement.textContent = 0;
        },

        // Calling This Function Will Add Page Element To The Object
        // UI Elements
        addElementsToObject: function () {
            this.scoreElement = document.querySelector(
                `.player-${this.player}-score`
            );
            this.currentScoreElement = document.querySelector(
                `.player-${this.player}-current-score`
            );
            this.playerContainer = document.querySelector(
                `.player-${this.player}-container`
            );
        },
    };

    // Add UI Elements To Object
    player.addElementsToObject();

    return player;
};

/* ------------- Program Variables ------------- */
const playerOne = createPlayer("one", "Player 1");
const playerTwo = createPlayer("two", "Player 2");

// This Will change the scoring for each player either 1 or 2
let playerTurn = 1;
// Holding The Object For The Player Who currently Playing
let playingNow = playerOne;

/* ------------- Event Handling ------------- */
rollDiceButton.addEventListener("click", () => {
    rollDice();
});

holdButton.addEventListener("click", () => {
    holdGameButton();
    checkForWinner(playingNow);
    changePlayer(playerTurn);
});

playAgainButton.forEach((button) => {
    button.addEventListener("click", () => {
        changePlayer(2);
        playerOne.playerContainer.classList.add("turn");
        playerTwo.playerContainer.classList.remove("turn");
        playerOne.score = 0;
        playerTwo.score = 0;
        playerOne.currentScore = 0;
        playerTwo.currentScore = 0;

        playerOne.changeCurrentScoreText();
        playerTwo.changeCurrentScoreText();

        playerOne.changeScoreText();
        playerTwo.changeScoreText();

        hideDice();
        winModal.classList.remove("active");
        overlay.classList.remove("active");
    });
});

showGameInfo.addEventListener("click", () => {
    overlay.classList.add("active");
    gameInfoContainer.classList.add("active");
});

closeGameInfo.addEventListener("click", () => {
    overlay.classList.remove("active");
    gameInfoContainer.classList.remove("active");
});

overlay.addEventListener("click", () => {
    overlay.classList.remove("active");
    gameInfoContainer.classList.remove("active");
});
