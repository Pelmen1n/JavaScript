let prices = [100, 500, 250, 750, 300];

const priceList = document.getElementById('priceList');
const sortAscButton = document.getElementById('sortAsc');
const sortDescButton = document.getElementById('sortDesc');

function displayPrices() {

    priceList.innerHTML = '';
    
    for (let i = 0; i < prices.length; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = prices[i] + ' руб.';
        priceList.append(listItem);
    }
}

function sortAscending() {
    prices.sort(function(a, b) {
        return a - b;
    });
    displayPrices();
}

function sortDescending() {
    prices.sort(function(a, b) {
        return b - a;
    });
    displayPrices();
}

sortAscButton.onclick = sortAscending;
sortDescButton.onclick = sortDescending;

displayPrices();