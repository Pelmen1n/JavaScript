import { storage } from './modules/storage.js';
import { Delivery, EditDelivery } from './modules/classes.js';

let deliveries = [];
let editingId = null;
let isEditMode = false;

// Загрузка данных
function loadDeliveries() {
    const saved = storage.getDeliveries();
    
    // Если нет сохраненных данных
    if (!saved || saved.length === 0) {
        deliveries = [];
        return;
    }
    
    deliveries = saved.map(item => {
        if (item.status) {
            return new EditDelivery(item.name, item.address, item.distance, item.status);
        } else {
            return new Delivery(item.name, item.address, item.distance);
        }
    });
}

// Сохранение данных
function saveDeliveries() {
    storage.saveDeliveries(deliveries);
}

// Инициализация тестовых данных
function initTestData() {
    // Проверяем, нужно ли создавать тестовые данные
    if (deliveries.length === 0) {
        deliveries = [
            new EditDelivery("Ольга", "ул. Вымыслов, д. 12", 8, "delivery"),
            new EditDelivery("Дмитрий", "ул. Задачная, д. 7", 3, "delivered"),
            new EditDelivery("Оля", "ул. Ткачей, д. 43", 11, "delivery")
        ];
        saveDeliveries();
    }
}

// Отображение доставок
function renderDeliveries() {
    const container = document.getElementById('deliveries');
    container.innerHTML = '';
    
    deliveries.forEach(delivery => {
        const card = delivery.createCard();
        
        // Обработчики событий
        card.querySelector('.edit-btn').addEventListener('click', () => {
            openEditModal(delivery);
        });
        
        card.querySelector('.delete-btn').addEventListener('click', () => {
            if (confirm('Удалить доставку?')) {
                deleteDelivery(delivery.id);
            }
        });
        
        container.appendChild(card);
    });
}

// Открытие модального окна для добавления
function openAddModal() {
    isEditMode = false;
    editingId = null;
    
    document.getElementById('modalTitle').textContent = 'Новая доставка';
    document.getElementById('statusGroup').style.display = 'none';
    
    document.getElementById('nameInput').value = '';
    document.getElementById('addressInput').value = '';
    document.getElementById('distanceInput').value = '';
    document.getElementById('statusSelect').value = 'delivery';
    
    document.getElementById('modal').style.display = 'flex';
}

// Открытие модального окна для редактирования
function openEditModal(delivery) {
    isEditMode = true;
    editingId = delivery.id;
    
    document.getElementById('modalTitle').textContent = 'Редактировать доставку';
    document.getElementById('statusGroup').style.display = 'block';
    
    document.getElementById('nameInput').value = delivery.name;
    document.getElementById('addressInput').value = delivery.address;
    document.getElementById('distanceInput').value = delivery.distance;
    
    if (delivery instanceof EditDelivery) {
        document.getElementById('statusSelect').value = delivery.status;
    } else {
        document.getElementById('statusSelect').value = 'delivery';
    }
    
    document.getElementById('modal').style.display = 'flex';
}

// Закрытие модального окна
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Обработка формы
function handleSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('nameInput').value.trim();
    const address = document.getElementById('addressInput').value.trim();
    const distance = parseFloat(document.getElementById('distanceInput').value);
    const status = document.getElementById('statusSelect').value;
    
    if (!name || !address || !distance || distance <= 0) {
        alert('Заполните все поля правильно');
        return;
    }
    
    if (isEditMode) {
        // Редактирование
        const index = deliveries.findIndex(d => d.id === editingId);
        if (index !== -1) {
            const delivery = deliveries[index];
            
            delivery.name = name;
            delivery.address = address;
            delivery.distance = distance;
            
            if (delivery instanceof EditDelivery) {
                delivery.status = status;
            } else {
                // Преобразуем в EditDelivery
                deliveries[index] = new EditDelivery(name, address, distance, status);
                deliveries[index].id = delivery.id;
            }
        }
    } else {
        // Добавление
        const newDelivery = new EditDelivery(name, address, distance, status);
        deliveries.push(newDelivery);
    }
    
    saveDeliveries();
    renderDeliveries();
    closeModal();
    hideTotalResult();
}

// Удаление доставки
function deleteDelivery(id) {
    deliveries = deliveries.filter(d => d.id !== id);
    saveDeliveries();
    renderDeliveries();
    hideTotalResult();
}

// Расчет общего расстояния (Задание 3)
function calculateTotalDistance() {
    const total = EditDelivery.getTotalDistance(deliveries);
    
    document.getElementById('totalKm').textContent = total;
    document.getElementById('totalResult').style.display = 'block';
}

// Скрытие результата расчета
function hideTotalResult() {
    document.getElementById('totalResult').style.display = 'none';
}

// Инициализация
function init() {
    loadDeliveries();
    initTestData();  // Тестовые данные при первом запуске
    renderDeliveries();  // Отображаем доставки
    
    // Обработчики событий
    document.getElementById('addBtn').addEventListener('click', openAddModal);
    document.getElementById('calcBtn').addEventListener('click', calculateTotalDistance);
    document.getElementById('deliveryForm').addEventListener('submit', handleSubmit);
    document.getElementById('cancelBtn').addEventListener('click', closeModal);
    
    // Закрытие модального окна при клике вне его
    document.getElementById('modal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('modal')) {
            closeModal();
        }
    });
}

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', init);
