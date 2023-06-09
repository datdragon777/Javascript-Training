let player1Time = 102
let player2Time = 107

const getFastestRaceTime = () => {
    if (player1Time <player2Time) {
        return player1Time
    } else if (player2Time < player1Time) {
        return player2Time
    } else {
        return player1Time
    }
}
console.log(getFastestRaceTime());

const totalRaceTime = () => {
    const result = player1Time + player2Time
    return result
}
console.log(totalRaceTime());
