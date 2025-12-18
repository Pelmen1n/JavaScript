let heights = [160, 175, 182, 155, 168, 190, 172];

const heightsList = document.querySelector('.heights-list');
const addButton = document.querySelector('.add-height');
const filterButton = document.querySelector('.filter');

// Функция для отображения списка роста
function showHeights(filterValue = null) {
    heightsList.innerHTML = '';
    
    let heightsToShow = heights;
    
    // Если задан фильтр, показываем только значения больше или равные фильтру
    if (filterValue !== null && filterValue !== '') {
        const minHeight = Number(filterValue);
        if (!isNaN(minHeight)) {
            heightsToShow = heights.filter(height => height >= minHeight);
        }
    }
    
    // Если нет данных для отображения
    if (heightsToShow.length === 0) {
        const noDataItem = document.createElement('li');
        noDataItem.textContent = 'Нет данных';
        noDataItem.classList.add('no-data');
        heightsList.append(noDataItem);
        return;
    }
    
    // Отображаем рост
    for (let i = 0; i < heightsToShow.length; i++) {
        const heightItem = document.createElement('li');
        heightItem.textContent = heightsToShow[i] + ' см';
        heightsList.append(heightItem);
    }
}

// Показываем рост при загрузке страницы
showHeights();

// Добавление роста
addButton.onclick = function() {
    const heightInput = prompt('Введите рост ученика в см:');
    
    if (heightInput === null || heightInput.trim() === '') {
        alert('Рост не введён!');
        return;
    }
    
    const height = Number(heightInput.trim());
    
    // Проверяем, что введено число
    if (isNaN(height)) {
        alert('Пожалуйста, введите число!');
        return;
    }
    
    heights.push(height);
    showHeights();
};

// Фильтрация роста
filterButton.onclick = function() {
    const filterValue = prompt('Введите минимальный рост для фильтрации (в см):');
    
    if (filterValue === null) {
        return; // Пользователь отменил ввод
    }
    
    // Показываем все или фильтруем
    showHeights(filterValue.trim());
};