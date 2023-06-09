let largeCountries = ["China", "India", "USA", "Indonesia", "Pakistan"]
largeCountries.push("Vietnam")
largeCountries.push("Japan")

console.log("The 5 largest countries in the world:");
for (let i = 0; i < largeCountries.length; i++) {
    console.log("- " + largeCountries[i]);
}

console.log(largeCountries.pop())

console.log(largeCountries.unshift("Singapore"));

console.log(largeCountries.shift());

console.log(largeCountries);

