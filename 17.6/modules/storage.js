const STORAGE_KEY = 'warehouse_items';

export function getItems() {
    const itemsJSON = localStorage.getItem(STORAGE_KEY);
    return itemsJSON ? JSON.parse(itemsJSON) : [];
}

export function saveItems(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addItem(item) {
    const items = getItems();
    items.push(item);
    saveItems(items);
    return items;
}

export function deleteItem(id) {
    const items = getItems();
    const filteredItems = items.filter(item => item.id !== id);
    saveItems(filteredItems);
    return filteredItems;
}

export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}