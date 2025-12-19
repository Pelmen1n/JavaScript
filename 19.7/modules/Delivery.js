export class Delivery {
    constructor(customerName, address, distance) {
        this._customerName = customerName;
        this._address = address;
        this._distance = distance;
    }

    // Геттеры
    get customerName() {
        return this._customerName;
    }

    get address() {
        return this._address;
    }

    get distance() {
        return this._distance;
    }

    // Сеттеры
    set customerName(value) {
        this._customerName = value;
    }

    set address(value) {
        this._address = value;
    }

    set distance(value) {
        this._distance = value;
    }

    // Метод создания карточки
    createCard() {
        const card = document.createElement('div');
        card.className = 'delivery-card delivery';
        
        card.innerHTML = `
            <div class="card-header">
                <div class="customer-name">${this._customerName}</div>
                <div class="status-badge delivery">Доставляется</div>
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
}