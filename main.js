const p1Button = document.querySelector("#p1Button")
const p2Button = document.querySelector("#p2Button")
const p1Display = document.querySelector("#p1Display")
const p2Display = document.querySelector("#p2Display")
const resetButton = document.querySelector("#resetButton")
const newSetButton = document.querySelector("#newSetButton")
const winningScoreSelect = document.querySelector("#winningScore")
const setScoresListDiv = document.querySelector(".setScoresListDiv")

let p1Score = 0;
let p2Score = 0;
let winningScore = 3;
let isGameOver = false;

winningScoreSelect.addEventListener("change", function () {
    winningScore = parseInt(this.value);
})

resetButton.addEventListener("click", completeReset);

function reset() {
    p1Score = 0;
    p2Score = 0;
    p1Display.textContent = 0;
    p2Display.textContent = 0;
    isGameOver = false;
    p1Display.classList.remove("winner", "loser");
    p2Display.classList.remove("winner", "loser");

}

function completeReset() {
    reset();
    playAudio("newGame");
    document.querySelector("#setScoresList").innerHTML = "";
    setScoresListDiv.style.visibility = "hidden";
    numberOfSets = 0;
    firstSetCreationCheck = 0;
}

p1Button.addEventListener("click", function () {
    if (!isGameOver) {
        p1Score += 1;
        playAudio("ping");
        if (p1Score === winningScore) {
            isGameOver = true;
            p1Display.classList.add("winner");
            p2Display.classList.add("loser");
            playGameOverSound(p1Score, p2Score);
        }
        p1Display.textContent = p1Score;
        showFloatingPlus(p1Display);
    }
})

p2Button.addEventListener("click", function () {
    if (!isGameOver) {
        p2Score += 1;
        playAudio("ping");
        if (p2Score === winningScore) {
            isGameOver = true;
            p2Display.classList.add("winner");
            p1Display.classList.add("loser");
            playGameOverSound(p2Score, p1Score);
        }
        p2Display.textContent = p2Score;
        showFloatingPlus(p2Display);
    }
})

function playGameOverSound(winnerScore, loserScore) {
    if (winnerScore > (loserScore + 4)) {
        playAudio("humiliated");
    }
    else if (winnerScore < (loserScore + 3)) {
        playAudio("thatWasClose");
    }
    else {
        playAudio("gameOver");
    }

}

function playAudio(name) {
    const audio = document.createElement("audio");
    audio.src = "sounds/" + name + ".mp3";
    document.body.append(audio);
    audio.play();
    setTimeout(function deleteElement() {
        audio.remove();
    }, 5000)
}

function showFloatingPlus(element) {
    const floatPlus = document.createElement('div');
    floatPlus.textContent = '+1';
    floatPlus.className = 'floatPlus';

    const rect = element.getBoundingClientRect();

    floatPlus.style.position = "absolute";
    floatPlus.style.left = `${rect.left + window.scrollX}px`;
    floatPlus.style.top = `${rect.top + window.scrollY}px`;

    console.log(`Floating element position: left=${floatPlus.style.left}, top=${floatPlus.style.top}`);

    document.body.appendChild(floatPlus);

    floatPlus.addEventListener('animationend', () => {
        document.body.removeChild(floatPlus);
    });

}

newSetButton.addEventListener("click", createNewSet);

let numberOfSets = 0;
let firstSetCreationCheck = 0;

function createNewSet() {
    if (isGameOver === true) {
        numberOfSets++;
        firstSetCreationCheck++;
        let scoreList = document.querySelector("#setScoresList");

        if (firstSetCreationCheck === 1) {
            let rowConst = document.createElement("tr");
            let cellSetNumberConst = document.createElement("th");
            cellSetNumberConst.textContent = "Sets";
            rowConst.appendChild(cellSetNumberConst);
            let cellP1Const = document.createElement("th");
            cellP1Const.textContent = "Player 1";
            rowConst.appendChild(cellP1Const);
            let cellP2Const = document.createElement("th");
            cellP2Const.textContent = "Player 2";
            rowConst.appendChild(cellP2Const);

            scoreList.appendChild(rowConst);

        }
        let row = document.createElement("tr");

        let cellSetNumber = document.createElement("td");
        cellSetNumber.textContent = (`${numberOfSets}.`);
        row.appendChild(cellSetNumber);
        let cellP1 = document.createElement("td");
        cellP1.textContent = `${p1Score}`;
        row.appendChild(cellP1);
        let cellP2 = document.createElement("td");
        cellP2.textContent = `${p2Score}`;
        row.appendChild(cellP2);

        scoreList.appendChild(row);

        if (p1Score > p2Score) {
            cellP1.classList.add("winner");
            cellP2.classList.add("loser");
        } else {
            cellP1.classList.add("loser");
            cellP2.classList.add("winner");
        }

        reset();
        playAudio("newRound");
        setScoresListDiv.style.visibility = "initial";

    }

}

const plusQuestionP1 = document.querySelector(".thePlusQuestionP1");
const plusQuestionP2 = document.querySelector(".thePlusQuestionP2");

p1Button.addEventListener("mouseover", function () {
    plusQuestionP1.style.visibility = "visible";
})

p1Button.addEventListener("mouseout", function () {
    plusQuestionP1.style.visibility = "hidden";
})

p2Button.addEventListener("mouseover", function () {
    plusQuestionP2.style.visibility = "visible";
})

p2Button.addEventListener("mouseout", function () {
    plusQuestionP2.style.visibility = "hidden";
})

resetButton.addEventListener("click", function () {
    reset();
    plusQuestionP1.style.display = "none";
    plusQuestionP2.style.display = "none";
})