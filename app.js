var scores, roundScore, activePlayer, dice

init()

document.querySelector(".btn-roll").addEventListener("click", function () {
    if (gameOn) {
        dice = Math.floor(Math.random() * 6) + 1
        var diceElement = document.querySelector(".dice")
        diceElement.style.display = "block"
        diceElement.src = "dice-" + dice + ".png"
        if (dice !== 1) {
            roundScore += dice
            document.querySelector("#current-" + activePlayer).textContent = roundScore
        } else {

            nextPlayer()
        }
    }
})

document.querySelector(".btn-keep").addEventListener("click", function () {

    if (gameOn) {
        scores[activePlayer] += roundScore

        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer]

        if (scores[activePlayer] >= 100) {
            gameOver()

        } else {

            nextPlayer()
        }
    }

})

function hideDice() {
    document.querySelector(".dice").style.display = "none"
}

function nextPlayer() {
    document.querySelector("#current-" + activePlayer).textContent = 0
    activePlayer = Math.abs(activePlayer - 1)
    roundScore = 0
    document.querySelector(".player-0-panel").classList.toggle("active")
    document.querySelector(".player-1-panel").classList.toggle("active")
    hideDice()

}

document.querySelector(".btn-new").addEventListener("click", init)

function init() {
    gameOn = true
    scores = [0, 0]
    roundScore = 0
    activePlayer = 0
    hideDice()

    document.querySelector("#score-0").textContent = 0
    document.querySelector("#score-1").textContent = 0
    document.querySelector("#current-0").textContent = 0
    document.querySelector("#current-1").textContent = 0
    document.querySelector("#name-0").textContent = "Player 1"
    document.querySelector("#name-1").textContent = "Player 2"

    var panel0 = document.querySelector(".player-0-panel")
    var panel1 = document.querySelector(".player-1-panel")

    panel0.classList.remove("winner")
    panel0.classList.remove("active")
    panel1.classList.remove("winner")
    panel1.classList.remove("active")

    panel0.classList.add("active")
}

function gameOver() {
    gameOn = false
    document.querySelector("#name-" + activePlayer).textContent = "Winner!"
    document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner")
    hideDice()
}