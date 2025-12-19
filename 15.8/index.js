const API_URL = "https://sb-film.skillbox.cc/films";
const EMAIL = "ovikdevil@gmail.com";

// Валидация формы
function validateForm() {
    const title = document.getElementById("title").value.trim();
    const genre = document.getElementById("genre").value.trim();
    const releaseYear = document.getElementById("releaseYear").value.trim();
    
    let isValid = true;
    
    if (!title) {
        document.getElementById("titleError").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("titleError").style.display = "none";
    }
    
    if (!genre) {
        document.getElementById("genreError").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("genreError").style.display = "none";
    }
    
    if (!releaseYear || isNaN(releaseYear) || releaseYear < 1900 || releaseYear > 2025) {
        document.getElementById("yearError").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("yearError").style.display = "none";
    }
    
    return isValid;
}

// Обработка отправки формы
async function handleFormSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    const title = document.getElementById("title").value;
    const genre = document.getElementById("genre").value;
    const releaseYear = document.getElementById("releaseYear").value;
    const isWatched = document.getElementById("isWatched").checked;

    const film = {
        title: title,
        genre: genre,
        releaseYear: releaseYear,
        isWatched: isWatched,
    };

    await addFilm(film);
    
    // Очистка формы
    document.getElementById("film-form").reset();
    document.getElementById("titleError").style.display = "none";
    document.getElementById("genreError").style.display = "none";
    document.getElementById("yearError").style.display = "none";
}

// Добавление фильма
async function addFilm(film) {
    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            email: EMAIL,
        },
        body: JSON.stringify(film),
    });
    renderTable();
}

// Удаление фильма
async function deleteFilm(id) {
    if (confirm("Удалить фильм?")) {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                email: EMAIL,
            },
        });
        renderTable();
    }
}

// Удаление всех фильмов
async function deleteAllFilms() {
    if (confirm("Удалить все фильмы?")) {
        await fetch(API_URL, {
            method: "DELETE",
            headers: {
                email: EMAIL,
            },
        });
        renderTable();
    }
}

// Получение фильмов с фильтрацией
async function getFilms() {
    const filterInput = document.getElementById("filterInput").value.trim();
    const filterType = document.getElementById("filterType").value;
    
    let url = API_URL;
    
    if (filterInput) {
        if (filterType === "isWatched") {
            const watchedValue = filterInput.toLowerCase() === "да" ? "true" : "false";
            url += `?${filterType}=${watchedValue}`;
        } else {
            url += `?${filterType}=${encodeURIComponent(filterInput)}`;
        }
    }
    
    const filmsResponse = await fetch(url, {
        headers: {
            email: EMAIL,
        },
    });
    
    return await filmsResponse.json();
}

// Отображение таблицы
async function renderTable() {
    const films = await getFilms();
    const filmTableBody = document.getElementById("film-tbody");

    filmTableBody.innerHTML = "";

    if (films.length === 0) {
        const row = document.createElement("tr");
        row.id = "noFilmsRow";
        row.innerHTML = `<td colspan="5" align="center">Нет фильмов</td>`;
        filmTableBody.appendChild(row);
        return;
    }

    films.forEach((film) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${film.title}</td>
            <td>${film.genre}</td>
            <td>${film.releaseYear}</td>
            <td>${film.isWatched ? "Да" : "Нет"}</td>
            <td>
                <button class="delete-btn" onclick="deleteFilm('${film.id}')">Удалить</button>
            </td>
        `;
        filmTableBody.appendChild(row);
    });
}

// Инициализация
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("film-form").addEventListener("submit", handleFormSubmit);
    document.getElementById("clearAllBtn").addEventListener("click", deleteAllFilms);
    document.getElementById("filterInput").addEventListener("input", renderTable);
    document.getElementById("filterType").addEventListener("change", renderTable);
    
    renderTable();
});