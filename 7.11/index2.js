let products = ["Яблоки", "Молоко", "Хлеб", "Сыр", "Чай"];

const productsList = document.querySelector('.products-list');
const addButton = document.querySelector('.add-product');

function sortProducts() {
    products.sort();
}

function showProducts() {

    sortProducts();
    
    productsList.innerHTML = '';
    
    if (products.length === 0) {
        const noDataItem = document.createElement('li');
        noDataItem.textContent = 'Корзина пуста';
        noDataItem.classList.add('no-data');
        productsList.append(noDataItem);
        return;
    }
    
    for (let i = 0; i < products.length; i++) {
        const productItem = document.createElement('li');
        productItem.textContent = products[i];
        productsList.append(productItem);
    }
}

showProducts();

addButton.onclick = function() {
    const productName = prompt('Введите название товара:');
    
    if (productName === null || productName.trim() === '') {
        alert('Название товара не введено!');
        return;
    }
    
    products.push(productName.trim());
    
    showProducts();
};