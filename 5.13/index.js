function addToCart(productName) {
    const cartElement = document.querySelector('#cart');
    const newItem = document.createElement('li');
    newItem.textContent = productName;
    cartElement.append(newItem);
}