let fruits = ["apple", "orange", "apple", "apple", "orange"]
let appleShelf = document.getElementById("apple-shelf")
let orangeShelf = document.getElementById("orange-shelf")

const sortFruit = () => {
    for (let i = 0; i < fruits.length; i++) {
        if (fruits[i] === "apple") {
            appleShelf.textContent += "apple"
        } else {
            orangeShelf.textContent += "orange"
        }
    }
}
sortFruit()