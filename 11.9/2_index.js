const cardTextInput = document.getElementById('cardText');
const cardColorSelect = document.getElementById('cardColor');
const cardElement = document.getElementById('card');

cardTextInput.addEventListener('input', function() {
    cardElement.textContent = this.value || 'Текст карты';
});

cardTextInput.addEventListener('focus', function() {
    this.style.borderColor = '#4CAF50';
    this.style.backgroundColor = '#f9fff9';
    this.style.boxShadow = '0 0 5px rgba(76, 175, 80, 0.3)';
});

cardTextInput.addEventListener('blur', function() {
    this.style.borderColor = '#ccc';
    this.style.backgroundColor = '';
    this.style.boxShadow = '';
});

cardColorSelect.addEventListener('change', function() {
    cardElement.style.backgroundColor = this.value;
});

window.addEventListener('DOMContentLoaded', function() {

    cardElement.textContent = cardTextInput.value || 'Текст карты';
    
    cardElement.style.backgroundColor = cardColorSelect.value;
});