let num1 = 8
let num2 = 2

document.getElementById("num1-el").textContent = num1
document.getElementById("num2-el").textContent = num2

let sumEl = document.getElementById("sum-el")
const add = () => {
    sumEl.textContent = `Sum:  ${num1 + num2}`
}

const subtract = () => {
    sumEl.textContent = `Subtract:  ${num1 - num2}`
}

const divide = () => {
    sumEl.textContent = `Divide:  ${num1 / num2}`
}

const multiply = () => {
    sumEl.textContent = `Multiply:  ${num1 * num2}`
}
