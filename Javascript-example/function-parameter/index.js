const welcomeEl = document.getElementById("welcome-el")
const greetUser = (greeting, name, subName) => {
    welcomeEl.textContent = `${greeting}! ${name} ${subName}`
}
greetUser("Go to hell", "Peter", "Teo")

// --------------------------------------------------------------

const add = (a, b) => {
    return a + b
}
console.log(add(3, 4));
console.log(add(100, 7));

// --------------------------------------------------------------

const getFirst = (arr) => {
    return arr[0]
}
let firstCard = getFirst([42, 53, 10, 89])
console.log(firstCard);