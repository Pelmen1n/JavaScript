// Задание 2: Функция прогресс бара
function progress(time, progressBarId, timerId) {
    // Минимальное время - 2 секунды
    if (time < 2) time = 2;
    
    const progressBar = document.getElementById(progressBarId);
    const timerElement = document.getElementById(timerId);
    
    // Сброс
    progressBar.style.transform = 'scaleX(0)';
    progressBar.style.transition = 'none';
    
    // Принудительный рефлоу для сброса анимации
    void progressBar.offsetWidth;
    
    // Устанавливаем плавную анимацию
    progressBar.style.transition = `transform ${time}s linear`;
    
    let seconds = 0;
    
    // Обновляем таймер каждую секунду
    const timerInterval = setInterval(() => {
        seconds++;
        if (timerElement) {
            timerElement.textContent = `${seconds} с`;
        }
    }, 1000);
    
    // Запускаем анимацию
    setTimeout(() => {
        progressBar.style.transform = 'scaleX(1)';
    }, 10);
    
    // Останавливаем таймер и сбрасываем по окончании времени
    setTimeout(() => {
        clearInterval(timerInterval);
        if (timerElement) {
            timerElement.textContent = `${time} с (завершено)`;
        }
    }, time * 1000);
}

// Задание 1: Функции, имитирующие запросы
function getCatImages() {
    return new Promise((resolve) => {
        // Случайное время от 2 до 5 секунд
        const delay = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
        
        setTimeout(() => {
            const images = [
                'cat1.jpg',
                'cat2.jpg', 
                'cat3.jpg'
            ];
            resolve({ images, delay });
        }, delay);
    });
}

function getDogImages() {
    return new Promise((resolve) => {
        // Случайное время от 2 до 5 секунд
        const delay = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
        
        setTimeout(() => {
            const images = [
                'dog1.jpg',
                'dog2.jpg',
                'dog3.jpg'
            ];
            resolve({ images, delay });
        }, delay);
    });
}

// Функция для отображения изображений (картинки в той же папке)
function displayImages(imageNames, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    imageNames.forEach(imageName => {
        // Картинка в той же папке (просто имя файла)
        const img = document.createElement('img');
        img.src = imageName;
        img.alt = imageName;
        img.className = 'image-item';
        
        // Если картинка не найдена, показываем заглушку
        img.onerror = function() {
            this.onerror = null; // Предотвращаем бесконечный цикл
            this.src = `https://via.placeholder.com/200x150?text=${imageName}`;
            console.log(`Изображение ${imageName} не найдено, используем заглушку`);
        };
        
        container.appendChild(img);
    });
}

// Задание 3: Объединение задач
async function loadImagesWithProgress() {
    const loadBtn = document.getElementById('load-images-btn');
    loadBtn.disabled = true;
    loadBtn.textContent = 'Загрузка...';
    
    try {
        // Загружаем первые изображения (коты)
        console.log('Начало загрузки котов...');
        const catsPromise = getCatImages();
        
        // Сразу получаем промис, но не ждем его завершения
        catsPromise.then(({ delay }) => {
            // Запускаем прогресс бар для первой функции
            progress(delay / 1000, 'progress-bar-1', 'timer-1');
        });
        
        const catsResult = await catsPromise;
        displayImages(catsResult.images, 'images-container-1');
        console.log('Коты загружены за', catsResult.delay / 1000, 'сек');
        
        // Загружаем вторые изображения (собаки)
        console.log('Начало загрузки собак...');
        const dogsPromise = getDogImages();
        
        dogsPromise.then(({ delay }) => {
            // Запускаем прогресс бар для второй функции
            progress(delay / 1000, 'progress-bar-2', 'timer-2');
        });
        
        const dogsResult = await dogsPromise;
        displayImages(dogsResult.images, 'images-container-2');
        console.log('Собаки загружены за', dogsResult.delay / 1000, 'сек');
        
    } catch (error) {
        console.error('Ошибка при загрузке:', error);
        alert('Ошибка при загрузке изображений');
    } finally {
        loadBtn.disabled = false;
        loadBtn.textContent = 'Загрузить изображения';
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Кнопка для задания 2
    document.getElementById('start-progress-btn').addEventListener('click', function() {
        progress(5, 'progress-bar', 'timer');
    });
    
    // Кнопка для загрузки изображений
    document.getElementById('load-images-btn').addEventListener('click', loadImagesWithProgress);
    
    console.log('Страница загружена. Готово к работе!');
});
