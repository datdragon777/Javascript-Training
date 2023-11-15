// 1 - No arguments object in arrow function
// 1.1 - Normal function
function print01() {
    console.log(arguments);
}
print01("hello", "Peter", "Parker", 999999, true)
// 1.2 - Arrow function
const print02 = () => {
    console.log(arguments);
}
print02("what'sup bro", 4521, false)

// 2 - Arrow functions cannot be accessed before initialization
// 2.1 - Normal function
printName()
console.log("Heheboiz");
function printName() {
    console.log("My name is Miles Morales");
}
// 2.2 - Arrow function
printAnotherName()
console.log("Agent P");
const printAnotherName = () => {
    console.log("My another name is Spiderman");
}