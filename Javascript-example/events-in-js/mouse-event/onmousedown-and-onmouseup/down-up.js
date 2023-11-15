const isDragging = false;
let initialX, initialY;

function startDragging(event) {
  let isDragging = true;
  initialX = event.clientX;
  initialY = event.clientY;

  document.addEventListener("mousemove", dragElement);
}

function stopDragging(event) {
  let isDragging = false;
  document.removeEventListener("mousemove", dragElement);
}

function dragElement(event) {
  if (isDragging) {
    const draggableElement = document.querySelector(".draggable");
    let offsetX = event.clientX - initialX;
    let offsetY = event.clientY - initialY;
    draggableElement.style.left = draggableElement.offsetLeft + offsetX + "px";
    draggableElement.style.top = draggableElement.offsetTop + offsetY + "px";

    initialX = event.clientX;
    initialY = event.clientY;
  }
}
