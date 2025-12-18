function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.color = 'red';
}

function clearErrors() {
    const errorElements = document.querySelectorAll('[id$="Error"]');
    errorElements.forEach(error => error.textContent = '');
}

function showResults(data) {
    document.getElementById('resultName').textContent = data.username;
    document.getElementById('resultEmail').textContent = data.email;
    document.getElementById('resultGender').textContent = data.gender;
    document.getElementById('resultRating').textContent = data.rating;
    document.getElementById('resultInterests').textContent = data.interests.join(', ');
    document.getElementById('resultComments').textContent = data.comments;
    document.getElementById('result').style.display = 'block';
}

document.getElementById('rating').addEventListener('input', function() {
    document.getElementById('ratingValue').textContent = this.value;
});

document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    clearErrors();
    
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');
    const rating = document.getElementById('rating').value;
    const interests = document.querySelectorAll('input[name="interests"]:checked');
    const comments = document.getElementById('comments').value.trim();
    
    let isValid = true;
    
    if (!username) {
        showError('usernameError', 'Имя пользователя обязательно');
        isValid = false;
    }
    
    if (!email) {
        showError('emailError', 'Email обязателен');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('emailError', 'Введите корректный email');
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    const formData = {
        username: username,
        email: email,
        gender: gender ? gender.value : 'Не указано',
        rating: rating,
        interests: Array.from(interests).map(interest => interest.value),
        comments: comments || 'Нет комментариев'
    };
    
    showResults(formData);
});

document.getElementById('result').style.display = 'none';