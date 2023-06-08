let firstCard = 10
let secondCard = 4
let cards = [firstCard, secondCard]
let sum = firstCard + secondCard
let hasBlackjack = false
let isAlive = true
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")

const startGame = () => {
    renderGame()
}

const renderGame = () => {
    cardsEl.textContent = `Cards: `
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }

    sumEl.textContent = `Sum: ${sum}`
    if( sum <= 20 ) {
        message = "Do you want to draw a new card?"
    } else if ( sum == 21) {
        message = "Melm Mlem"
        hasBlackjack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}

const newCard = () => {
    let card = 7
    sum += card 
    cards.push(card)
    renderGame()
}

