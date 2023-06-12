// let myArray = `["chocolate"]`;
// myArray = JSON.parse(myArray);
// myArray.push("Ice cream")
// console.log(typeof myArray);
// console.log(myArray);
// myArray = JSON.stringify(myArray);
// console.log(typeof myArray);
// console.log(myArray);

let myLeads = [];
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
          <li>
              <a target='_blank' href='${leads[i]}'>
                  ${leads[i]}
              </a>
          </li>
      `;
  }
  ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", () => {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", () => {
  if (inputEl.value !== "") {
    if (!myLeads.includes(inputEl.value)) {
      myLeads.push(inputEl.value);
    }
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
    console.log(localStorage.getItem("myLeads"));
  }
});
