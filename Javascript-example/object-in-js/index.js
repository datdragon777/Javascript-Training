const demoId = document.querySelector("#demo-id");
demoId.textContent = "Demo ID updated successfully";

const teo = {
  name: "Peter Teo",
  race: "human",
  weapon: "sword",
  greet: function () {
    return `Hi, my name is ${this.name}!`;
  },
};

// console.log(teo);
// console.log(teo.greet());
// teo.age = 22
// console.log(teo.age);
// teo.fight = function() {
//     return `Using a ${this.weapon}`;
// }
// console.log(teo.fight());
// teo.weapon = "holy gun"
// console.log(teo);

// for (let key in teo) {
//     // console.log(teo[key]);
//     console.log(`${key.toLocaleUpperCase()}: ${teo[key]}`);
// }

const demoClasses = document.querySelectorAll(".demo-class");
demoClasses.forEach((element) => {
  element.textContent = "Mlem Mlem updated";
});
