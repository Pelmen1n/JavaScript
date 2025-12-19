function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.color = 'red';
}

function clearErrors() {
    const errorElements = document.querySelectorAll('[id$="Error"]');
    errorElements.forEach(error => error.textContent = '');
}

function clearForm() {
    document.getElementById('productName').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('distance').value = '';
}

function calculateDeliveryCost(weight, distance) {
    return (weight * distance) / 10;
}

document.getElementById('deliveryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    clearErrors();
    
    const productName = document.getElementById('productName').value.trim();
    const weight = parseFloat(document.getElementById('weight').value);
    const distance = parseInt(document.getElementById('distance').value);
    
    let isValid = true;
    
    if (!productName) {
        showError('productNameError', 'Введите название товара');
        isValid = false;
    } else if (productName.length < 2) {
        showError('productNameError', 'Название товара должно быть не менее 2 символов');
        isValid = false;
    }
    
    if (isNaN(weight) || weight <= 0) {
        showError('weightError', 'Введите корректный вес (положительное число)');
        isValid = false;
    }
    
    if (isNaN(distance) || distance <= 0) {
        showError('distanceError', 'Введите корректное расстояние (положительное число)');
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    const deliveryCost = calculateDeliveryCost(weight, distance);
    
    const tableBody = document.querySelector('#productsTable tbody');
    const newRow = document.createElement('tr');
    
    newRow.innerHTML = `
        <td>${productName}</td>
        <td>${weight.toFixed(1)}</td>
        <td>${distance}</td>
        <td>${deliveryCost.toFixed(2)} руб.</td>
    `;
    
    tableBody.appendChild(newRow);
    
    clearForm();
});