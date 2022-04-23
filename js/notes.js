const notesGroup = document.querySelector(".notes__group");
const notesItem = notesGroup.querySelectorAll(".notes__group-item");

let itemsCounter = notesItem.length;

const addBtn = document.querySelector(".notes__btn-add");
const removeBtn = document.querySelector(".notes__btn-remove");

for (let note of notesItem) {
  note.draggable = true;
}

notesGroup.addEventListener("dragstart", (e) => {
  e.target.classList.add("selected");
});

notesGroup.addEventListener("dragend", (e) => {
  e.target.classList.remove("selected");
});

// notesGroup.addEventListener("dragover", (e) => {
//   e.preventDefault();

//   const activeItem = notesGroup.querySelector(".selected");

//   const currentItem = e.target;

//   const isMoveable = activeItem !== currentItem &&
//     currentItem.classList.contains("notes__group-item");

//   if (!isMoveable) {
//     return;
//   }

//   const nextItem = (currentItem === activeItem.nextElementSibling) ?
//     currentItem.nextElementSibling :
//     currentItem;

//   notesGroup.insertBefore(activeItem, nextItem);
// });

const getNextItem = (cursorPosition, currentItem) => {
  const currentItemCoord = currentItem.getBoundingClientRect();
  const currentItemCenter = currentItemCoord.y + currentItemCoord.height / 2;

  const nextItem = (cursorPosition < currentItemCenter) ?
    currentItem :
    currentItem.nextElementSibling;

  return nextItem;
};

notesGroup.addEventListener("dragover", (e) => {
  e.preventDefault();

  const activeItem = notesGroup.querySelector(".selected");
  const currentItem = e.target;
  const isMoveable = activeItem !== currentItem &&
    currentItem.classList.contains("notes__group-item");

  if (!isMoveable) {
    return;
  }

  const nextItem = getNextItem(e.clientY, currentItem);

  if (
    nextItem &&
    activeItem === nextItem.previousElementSibling ||
    activeItem === nextItem
  ) {
    return;
  }

  notesGroup.insertBefore(activeItem, nextItem);
});

addBtn.addEventListener("click", () => {
  const newItem = notesItem[0].cloneNode(true);

  newItem.querySelector(".notes__group-item-title").textContent = `Заметка ${++itemsCounter}`;
  console.log(itemsCounter)
  newItem.querySelector(".notes__group-item-text").value = "";
  console.log(notesItem)
  notesGroup.appendChild(newItem);
});

removeBtn.addEventListener("click", () => {
  if (itemsCounter === 1) {
    return;
  }
  
  notesGroup.removeChild(notesGroup.lastChild);
  itemsCounter--;
});