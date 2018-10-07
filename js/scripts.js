var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function () {
    playerPick('ROCK')
});
pickPaper.addEventListener('click', function () {
    playerPick('PAPER')
});
pickScissors.addEventListener('click', function () {
    playerPick('SCISSORS')
});

var gameState = 'notStarted', //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

var newGameBtn = document.getElementById('js-newGameButton'),
    newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements() {
    switch (gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
            break;
        case 'ended':
            newGameBtn.innerText = 'Jeszcze raz?';
            playerPickElem.textContent = 'Wybór gracza';
            computerPickElem.textContent = 'Wybór komputera';
            playerResultElem.textContent = "Wynik gracza";
            computerResultElem.textContent = "Wynik komputera";
        case 'notStarted':
        default:
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
    }
}

setGameElements();

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
    player.name = prompt('Graczu, wpisz swoje imię', 'Imię gracza');
    if (player.name) {
        player.score = computer.score = 0;
        gameState = 'started';
        setGameElements();

        playerNameElem.innerHTML = player.name;
        setGamePoints();
    }
}

function getComputerPick() {
    var possiblePicks = ['ROCK', 'PAPER', 'SCISSORS'];
    return possiblePicks[Math.floor(Math.random() * 3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';

    var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick == 'ROCK' && playerPick == 'SCISSORS') ||
        (computerPick == 'SCISSORS' && playerPick == 'PAPER') ||
        (computerPick == 'PAPER' && playerPick == 'ROCK')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Wygrana!";
        player.score++;
        playerPointsElem.innerHTML = player.score;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Wygrana!";
        computer.score++;
        computerPointsElem.innerHTML = computer.score;
    }
    checkGameWinner();
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

function checkGameWinner() {

    if (player.score == 10) {
        gameState = 'ended';
        setGameElements();
        newGameBtn.innerText = 'Wygrałeś! Jeszcze raz?';
        playerResultElem.innerHTML = computerResultElem.innerHTML = '';
    }

    if (computer.score == 10) {
        gameState = 'ended';
        setGameElements();
        newGameBtn.innerText = 'Porażka! Jeszcze raz?';
        layerResultElem.innerHTML = computerResultElem.innerHTML = '';
    }
}
