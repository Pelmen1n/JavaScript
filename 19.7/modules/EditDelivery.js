import { Delivery } from './Delivery.js';

export class EditDelivery extends Delivery {
    constructor(customerName, address, distance, status = 'delivery') {
        super(customerName, address, distance);
        this._status = status;
        this._id = Date.now() + Math.random().toString(36).substr(2, 9);
    }

    // Геттеры
    get status() {
        return this._status;
    }

    get id() {
        return this._id;
    }

    // Сеттеры
    set status(value) {
        this._status = value;
    }

    // Метод получения статуса текстом
    getStatusText() {
        const statusMap = {
            'delivery': 'Доставляется',
            'delivered': 'Доставлен',
            'canceled': 'Отменён'
        };
        return statusMap[this._status] || 'Доставляется';
    }

    // Переопределенный метод создания карточки
    createCard() {
        const card = document.createElement('div');
        card.className = `delivery-card ${this._status}`;
        card.dataset.id = this._id;
        
        card.innerHTML = `
            <div class="card-header">
                <div class="customer-name">${this._customerName}</div>
                <div class="status-badge ${this._status}">${this.getStatusText()}</div>
            </div>
            <div class="card-info">
                <div class="info-item">
                    <span class="info-label">Адрес:</span>
                    <span class="info-value">${this._address}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Расстояние:</span>
                    <span class="info-value">${this._distance} км</span>
                </div>
            </div>
            <div class="card-actions">
                <button class="edit-btn">Изменить</button>
            </div>
        `;
        
        return card;
    }

    // Статический метод расчета общего расстояния
    static getTotalDistance(deliveries) {
        return deliveries.reduce((total, delivery) => {
            // Не суммируем отмененные доставки
            if (delivery.status !== 'canceled') {
                return total + delivery.distance;
            }
            return total;
        }, 0);
    }
}