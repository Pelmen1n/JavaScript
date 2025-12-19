import { addItem, generateId } from './storage.js';
import { showLoader, hideLoader } from './loader.js';
import { loadWarehousePage } from './warehouse-page.js';

export async function loadAddItemPage() {
    showLoader();
    
    try {
        renderPage();
    } finally {
        hideLoader();
    }
}

function renderPage() {
    const content = document.getElementById('content');
    
    content.innerHTML = `
        <div class="page">
            <div class="header">
                <h1>Добавить запись</h1>
            </div>
            
            <div class="form-container">
                <form id="addItemForm">
                    <div class="form-group">
                        <label for="name">Название:</label>
                        <input type="text" id="name" name="name">
                        <div class="error" id="nameError">Введите название</div>
                    </div>
                    
                    <div class="form-group">
                        <label for="shelf">Полка:</label>
                        <input type="text" id="shelf" name="shelf">
                        <div class="error" id="shelfError">Введите номер полки</div>
                    </div>
                    
                    <div class="form-group">
                        <label for="weight">Вес (кг):</label>
                        <input type="number" id="weight" name="weight" step="0.1" min="0">
                        <div class="error" id="weightError">Введите вес</div>
                    </div>
                    
                    <div class="form-group">
                        <label for="storageTime">Время хранения (дней):</label>
                        <input type="number" id="storageTime" name="storageTime" min="1">
                        <div class="error" id="storageTimeError">Введите время хранения</div>
                    </div>
                    
                    <div class="form-actions">
                        <a href="#" id="backBtn" class="btn back-btn">Назад</a>
                        <button type="submit" class="btn">Добавить</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    const form = document.getElementById('addItemForm');
    const backBtn = document.getElementById('backBtn');
    
    backBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        await loadWarehousePage();
    });
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            showLoader();
            
            try {
                const item = {
                    id: generateId(),
                    name: document.getElementById('name').value.trim(),
                    shelf: document.getElementById('shelf').value.trim(),
                    weight: parseFloat(document.getElementById('weight').value),
                    storageTime: parseInt(document.getElementById('storageTime').value)
                };
                
                addItem(item);
                await loadWarehousePage();
            } finally {
                hideLoader();
            }
        }
    });
}

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const shelf = document.getElementById('shelf').value.trim();
    const weight = document.getElementById('weight').value;
    const storageTime = document.getElementById('storageTime').value;
    
    let isValid = true;
    
    // Скрываем все ошибки
    document.querySelectorAll('.error').forEach(error => error.style.display = 'none');
    
    // Проверка названия
    if (!name) {
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    }
    
    // Проверка полки
    if (!shelf) {
        document.getElementById('shelfError').style.display = 'block';
        isValid = false;
    }
    
    // Проверка веса
    if (!weight || isNaN(weight) || parseFloat(weight) <= 0) {
        document.getElementById('weightError').style.display = 'block';
        isValid = false;
    }
    
    // Проверка времени хранения
    if (!storageTime || isNaN(storageTime) || parseInt(storageTime) <= 0) {
        document.getElementById('storageTimeError').style.display = 'block';
        isValid = false;
    }
    
    return isValid;
}