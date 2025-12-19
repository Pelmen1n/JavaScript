// Ключ для localStorage
const STORAGE_KEY = 'filmCollection';

// Получение фильмов из localStorage
function getFilmsFromStorage() {
    const filmsJSON = localStorage.getItem(STORAGE_KEY);
    return filmsJSON ? JSON.parse(filmsJSON) : [];
}

// Сохранение фильмов в localStorage
function saveFilmsToStorage(films) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(films));
}

// Отображение ошибки
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Скрытие ошибки
function hideError(elementId) {
    document.getElementById(elementId).style.display = 'none';
}

// Валидация формы
function validateForm() {
    const title = document.getElementById('title').value.trim();
    const genre = document.getElementById('genre').value.trim();
    const year = document.getElementById('year').value.trim();
    
    let isValid = true;
    
    // Валидация названия
    if (!title) {
        showError('titleError', 'Пожалуйста, введите название фильма');
        isValid = false;
    } else {
        hideError('titleError');
    }
    
    // Валидация жанра
    if (!genre) {
        showError('genreError', 'Пожалуйста, введите жанр фильма');
        isValid = false;
    } else {
        hideError('genreError');
    }
    
    // Валидация года
    if (!year || isNaN(year) || year < 1900 || year > 2025) {
        showError('yearError', 'Пожалуйста, введите корректный год (1900-2025)');
        isValid = false;
    } else {
        hideError('yearError');
    }
    
    return isValid;
}

// Отображение фильмов в таблице
function displayFilms(films) {
    const filmsList = document.getElementById('filmsList');
    const noFilmsRow = document.getElementById('noFilmsRow');
    
    // Очищаем таблицу
    filmsList.innerHTML = '';
    
    if (films.length === 0) {
        // Если фильмов нет, показываем сообщение
        const row = document.createElement('tr');
        row.id = 'noFilmsRow';
        row.innerHTML = `
            <td colspan="4" class="no-films">Фильмы не добавлены</td>
        `;
        filmsList.appendChild(row);
        return;
    }
    
    // Добавляем фильмы в таблицу
    films.forEach((film, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${film.title}</td>
            <td>${film.genre}</td>
            <td>${film.year}</td>
            <td class="actions-cell">
                <button type="button" class="edit-btn" data-index="${index}">Редактировать</button>
                <button type="button" class="cancel-btn" data-index="${index}">Удалить</button>
            </td>
        `;
        filmsList.appendChild(row);
    });
    
    // Добавляем обработчики для кнопок редактирования и удаления
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            editFilm(parseInt(this.getAttribute('data-index')));
        });
    });
    
    document.querySelectorAll('.cancel-btn').forEach(btn => {
        if (!btn.id) { // Исключаем кнопку отмены из формы
            btn.addEventListener('click', function() {
                deleteFilm(parseInt(this.getAttribute('data-index')));
            });
        }
    });
}

// Добавление нового фильма
function addFilm(film) {
    const films = getFilmsFromStorage();
    films.push(film);
    saveFilmsToStorage(films);
    displayFilms(films);
}

// Обновление фильма
function updateFilm(index, film) {
    const films = getFilmsFromStorage();
    films[index] = film;
    saveFilmsToStorage(films);
    displayFilms(films);
}

// Редактирование фильма
function editFilm(index) {
    const films = getFilmsFromStorage();
    const film = films[index];
    
    // Заполняем форму данными фильма
    document.getElementById('title').value = film.title;
    document.getElementById('genre').value = film.genre;
    document.getElementById('year').value = film.year;
    document.getElementById('editIndex').value = index;
    
    // Меняем заголовок формы
    document.getElementById('formTitle').textContent = 'Редактировать фильм';
    
    // Меняем текст кнопки
    document.getElementById('submitBtn').textContent = 'Сохранить изменения';
    
    // Показываем кнопку отмены
    document.getElementById('cancelBtn').style.display = 'inline-block';
}

// Удаление фильма
function deleteFilm(index) {
    if (confirm('Вы уверены, что хотите удалить этот фильм?')) {
        const films = getFilmsFromStorage();
        films.splice(index, 1);
        saveFilmsToStorage(films);
        displayFilms(films);
        
        // Если удаляем редактируемый фильм, сбрасываем форму
        const editIndex = parseInt(document.getElementById('editIndex').value);
        if (editIndex === index) {
            resetForm();
        }
    }
}

// Сортировка фильмов
function sortFilms(sortBy) {
    const films = getFilmsFromStorage();
    
    films.sort((a, b) => {
        if (sortBy === 'year') {
            return parseInt(a[sortBy]) - parseInt(b[sortBy]);
        }
        return a[sortBy].localeCompare(b[sortBy]);
    });
    
    saveFilmsToStorage(films);
    displayFilms(films);
}

// Сброс формы
function resetForm() {
    document.getElementById('filmForm').reset();
    document.getElementById('editIndex').value = '-1';
    document.getElementById('formTitle').textContent = 'Добавить новый фильм';
    document.getElementById('submitBtn').textContent = 'Добавить фильм';
    document.getElementById('cancelBtn').style.display = 'none';
    
    // Скрываем ошибки
    hideError('titleError');
    hideError('genreError');
    hideError('yearError');
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Отображаем фильмы из localStorage
    const films = getFilmsFromStorage();
    displayFilms(films);
    
    // Обработка отправки формы
    document.getElementById('filmForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        const film = {
            title: document.getElementById('title').value.trim(),
            genre: document.getElementById('genre').value.trim(),
            year: document.getElementById('year').value.trim()
        };
        
        const editIndex = parseInt(document.getElementById('editIndex').value);
        
        if (editIndex >= 0) {
            // Редактирование существующего фильма
            updateFilm(editIndex, film);
        } else {
            // Добавление нового фильма
            addFilm(film);
        }
        
        resetForm();
    });
    
    // Обработка кнопки отмены
    document.getElementById('cancelBtn').addEventListener('click', resetForm);
    
    // Обработка кнопки сортировки
    document.getElementById('sortBtn').addEventListener('click', function() {
        const sortBy = document.getElementById('sortBy').value;
        sortFilms(sortBy);
    });
});