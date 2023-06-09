let hands = ["rock", "paper", "scissor"]

const getHand = () => {
    let randomIndex = Math.floor(Math.random() * 3)
    return hands[randomIndex]
}

console.log(getHand());


