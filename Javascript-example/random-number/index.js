let randomNumber01 = Math.random()
console.log(randomNumber01);
console.log("--------------------------------------");

let randomNumber02 = Math.random() * 6
console.log(randomNumber02);
console.log("--------------------------------------");

let flooredNumber01 = Math.floor(3.45632) // It removes the decimals
console.log(flooredNumber01);
console.log("--------------------------------------");

let flooredNumber02 = Math.floor(Math.random() * 6)
console.log(flooredNumber02);
console.log("--------------------------------------");

let flooredNumber03 = Math.floor(Math.random() * 6) + 1
console.log(flooredNumber03);
console.log("--------------------------------------");

const dice = () => {
    const roll = Math.floor(Math.random() * 6) +1
    return `Dice: ${roll}`
}
console.log(dice());
