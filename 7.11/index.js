let books = ["Война и мир", "Преступление и наказание", "Мастер и Маргарита"];

const booksList = document.querySelector('.books-list');
const addButton = document.querySelector('.add-book');
const searchButton = document.querySelector('.search-book');

function showBooks() {
    booksList.innerHTML = '';
    
    for (let i = 0; i < books.length; i++) {
        const bookItem = document.createElement('li');
        bookItem.textContent = books[i];
        booksList.append(bookItem);
    }
}

showBooks();

addButton.onclick = function() {
    const bookName = prompt('Введите название книги:');
    
    if (bookName === null || bookName.trim() === '') {
        alert('Название книги не введено!');
        return;
    }
    
    books.push(bookName.trim());
    showBooks();
};

searchButton.onclick = function() {
    const allBooks = booksList.querySelectorAll('li');
    for (let i = 0; i < allBooks.length; i++) {
        allBooks[i].classList.remove('found');
    }
    
    const searchName = prompt('Введите название книги для поиска:');
    
    if (searchName === null || searchName.trim() === '') {
        alert('Название для поиска не введено!');
        return;
    }
    
    const searchTerm = searchName.trim();
    let found = false;
    
    for (let i = 0; i < allBooks.length; i++) {
        if (allBooks[i].textContent.toLowerCase() === searchTerm.toLowerCase()) {
            allBooks[i].classList.add('found');
            found = true;
        }
    }
    
    if (!found) {
        alert('Книга не найдена!');
    }
};