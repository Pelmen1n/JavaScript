function hello() {
  console.log('Skill');
}
try { 
  helo();  // Опечатка в имени функции
} catch(error) {
  console.error('Ошибка:', error.message);
}
console.log('complete');