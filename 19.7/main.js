import { EditDelivery } from './modules/EditDelivery.js';

// Массив доставок
const deliveryArr = [
    new EditDelivery("Ольга", "ул. Вымыслов, д. 12", 8, "delivery"),
    new EditDelivery("Дмитрий", "ул. Задачная, д. 7", 3, "delivered"),
    new EditDelivery("Иван", "ул. Ткачей, д. 43", 11, "canceled"),
    new EditDelivery("Анна", "ул. Ленина, д. 25", 5, "delivery"),
    new EditDelivery("Сергей", "ул. Мира, д. 18", 9, "delivered")
];

let currentEditDelivery = null;

// Инициализация приложения
function initApp() {
    renderDeliveries();
    setupEventListeners();
}

// Отображение всех доставок
function renderDeliveries() {
    const container = document.getElementById('deliveriesContainer');
    
    if (deliveryArr.length === 0) {
        container.innerHTML = '<div class="no-deliveries">Нет доставок</div>';
        return;
    }
    
    container.innerHTML = '';
    deliveryArr.forEach(delivery => {
        const card = delivery.createCard();
        
        // Добавляем обработчик для кнопки редактирования
        const editBtn = card.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => openEditModal(delivery));
        
        container.appendChild(card);
    });
}

// Настройка обработчиков событий
function setupEventListeners() {
    const editModal = document.getElementById('editModal');
    const editForm = document.getElementById('editForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const calculateBtn = document.getElementById('calculateBtn');
    
    // Кнопка расчета общего расстояния
    calculateBtn.addEventListener('click', () => {
        const totalDistance = EditDelivery.getTotalDistance(deliveryArr);
        const totalResult = document.getElementById('totalResult');
        totalResult.textContent = `Общее расстояние: ${totalDistance.toFixed(1)} км`;
    });
    
    // Закрытие модального окна
    cancelBtn.addEventListener('click', () => {
        editModal.style.display = 'none';
    });
    
    // Закрытие модального окна при клике вне его
    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) {
            editModal.style.display = 'none';
        }
    });
    
    // Обработка отправки формы редактирования
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (currentEditDelivery) {
            currentEditDelivery.customerName = document.getElementById('editName').value;
            currentEditDelivery.address = document.getElementById('editAddress').value;
            currentEditDelivery.distance = parseFloat(document.getElementById('editDistance').value);
            currentEditDelivery.status = document.getElementById('editStatus').value;
            
            renderDeliveries();
            editModal.style.display = 'none';
        }
    });
}

// Открытие модального окна редактирования
function openEditModal(delivery) {
    currentEditDelivery = delivery;
    
    document.getElementById('editName').value = delivery.customerName;
    document.getElementById('editAddress').value = delivery.address;
    document.getElementById('editDistance').value = delivery.distance;
    document.getElementById('editStatus').value = delivery.status;
    
    document.getElementById('editModal').style.display = 'flex';
}

// Запуск приложения при загрузке страницы
document.addEventListener('DOMContentLoaded', initApp);