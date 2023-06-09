const person = {
    name: 'Datker',
    age: 22,
    country: 'Vietnam'
}

const logData = () => {
    return `${person.name} is ${person.age} years old and lives in ${person.country}`
}
console.log(logData());