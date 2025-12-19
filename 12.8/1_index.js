// Объект с промокодом
const promocodeObj = {
    promocode: "PROM50",
    gift: "Скидка 50%"
};

// Вспомогательная функция для получения данных из куки
function getCookie() {
    return document.cookie.split('; ').reduce((acc, item) => {
        const [name, value] = item.split('=');
        acc[name] = value;
        return acc;
    }, {});
}

// Функция для сохранения промокода в cookie
function savePromoToCookie() {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1); // Куки на 1 год
    document.cookie = `promo=${promocodeObj.promocode}; expires=${expires.toUTCString()}; path=/`;
}

// Функция для активации промокода
function activatePromo() {
    const promoForm = document.getElementById('promoForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const giftText = document.getElementById('giftText');
    const promoInput = document.getElementById('promoInput');
    
    // Заполняем текст подарка
    giftText.textContent = promocodeObj.gift;
    
    // Показываем успешное сообщение и скрываем ошибку
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
    
    // Добавляем класс для активной формы
    promoForm.classList.add('active-form');
    
    // Блокируем поле ввода
    promoInput.disabled = true;
    promoInput.value = promocodeObj.promocode;
    
    // Сохраняем в cookie
    savePromoToCookie();
}

// Функция для сброса промокода
function resetPromo() {
    const promoForm = document.getElementById('promoForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const promoInput = document.getElementById('promoInput');
    
    // Скрываем все сообщения
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    
    // Убираем класс активной формы
    promoForm.classList.remove('active-form');
    
    // Разблокируем поле ввода
    promoInput.disabled = false;
    promoInput.value = '';
    
    // Удаляем куки
    document.cookie = "promo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Функция для проверки промокода
function checkPromoCode(inputPromo) {
    const errorMessage = document.getElementById('errorMessage');
    
    if (inputPromo === promocodeObj.promocode) {
        activatePromo();
    } else {
        // Показываем сообщение об ошибке
        errorMessage.style.display = 'block';
        document.getElementById('successMessage').style.display = 'none';
        
        // Через 3 секунды скрываем ошибку
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }
}

// Обработка отправки формы
document.getElementById('promoCodeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const promoInput = document.getElementById('promoInput');
    const inputValue = promoInput.value.trim();
    
    if (inputValue) {
        checkPromoCode(inputValue);
    }
});

// Проверка сохраненного промокода при загрузке страницы
window.addEventListener('DOMContentLoaded', function() {
    const cookie = getCookie();
    
    if (cookie.promo && cookie.promo === promocodeObj.promocode) {
        // Автоматически активируем промокод
        activatePromo();
    }
});