// Массив объектов с подарками
const giftArr = [
    {
        title: "Скидка 20% на первую покупку в нашем магазине!",
        icon: "💰",
        text: "Промокод: WELCOME20"
    },
    {
        title: "Скидка 10% на всё!",
        icon: "💸", 
        text: "Промокод: DISCOUNT10"
    },
    {
        title: "Подарок при первой покупке в нашем магазине!",
        icon: "🎁",
        text: "При покупке от 1000 рублей"
    },
    {
        title: "Бесплатная доставка для вас!",
        icon: "🚚",
        text: "Действует весь месяц"
    },
    {
        title: "Сегодня день больших скидок!",
        icon: "🔥",
        text: "Скидки до 50% на избранные товары"
    }
];

// Функция для получения случайного подарка
function getRandomGift() {
    const randomIndex = Math.floor(Math.random() * giftArr.length);
    return giftArr[randomIndex];
}

// Функция для показа попапа
function showPopup() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const giftIcon = document.getElementById('giftIcon');
    const popupTitle = document.getElementById('popupTitle');
    const popupText = document.getElementById('popupText');
    
    // Получаем случайный подарок
    const randomGift = getRandomGift();
    
    // Заполняем попап данными
    giftIcon.textContent = randomGift.icon;
    popupTitle.textContent = randomGift.title;
    popupText.textContent = randomGift.text;
    
    // Показываем попап и оверлей
    popup.style.display = 'block';
    overlay.style.display = 'block';
}

// Функция для закрытия попапа
function closePopup() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    
    popup.style.display = 'none';
    overlay.style.display = 'none';
}

// Показываем попап через 3 секунды после загрузки страницы
setTimeout(showPopup, 3000);

// Закрываем попап при клике на кнопку
document.getElementById('closeBtn').addEventListener('click', closePopup);

// Закрываем попап при клике на оверлей
document.getElementById('overlay').addEventListener('click', closePopup);