// for (let i = 10; i <= 100; i += 10) {
//     console.log(i);
// }

// let cards = [5, 7, 1]
// for (let i = 0; i < cards.length; i++) {
//     console.log(cards[i]);
// }

// Using loop + array
let sentence = ['Hello', 'my', 'name', 'is', 'Datker']
let greetingEl = document.getElementById("greeting-el")
for(let i = 0; i < sentence.length; i++) {
    greetingEl.textContent += sentence[i] + " "
    console.log(sentence[i]);
}