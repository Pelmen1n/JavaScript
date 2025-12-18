const addButton = document.getElementById('addButton');
const removeButton = document.getElementById('removeButton');
const itemList = document.getElementById('itemList');

let counter = 1;

addButton.onclick = function() {
    const newItem = document.createElement('li');
    newItem.textContent = 'Новый элемент списка ' + counter;
    itemList.append(newItem);
    counter++;
};

removeButton.onclick = function() {
    const lastItem = itemList.lastElementChild;
    if (lastItem) {
        lastItem.remove();
    }
};