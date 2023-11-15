const input = document.getElementById("item");
const btn = document.querySelector("button");
const itemList = document.querySelector("ul");

btn.addEventListener("click", () => {
  const inputValue = input.value;
  input.value = "";

  const item = document.createElement("li");
  const itemContent = document.createElement("span");
  const deleteBtn = document.createElement("button");

  item.setAttribute("id", "item");
  item.appendChild(itemContent);
  itemContent.textContent = inputValue;
  item.appendChild(deleteBtn);
  deleteBtn.textContent = "Delete";
  itemList.appendChild(item);

  // deleteBtn.addEventListener('click', () => {
  //     itemList.removeChild(item)
  // })

  itemList.addEventListener("click", deleteItem);
  input.focus();
});

function deleteItem(e) {
  const item = document.createElement("li");
  item.setAttribute("id", "item");

  let target = e.target.closest("#item");
  console.log(target);
  target.remove();
}
