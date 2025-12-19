import { loadWarehousePage } from './modules/warehouse-page.js';

// Загружаем начальную страницу
loadWarehousePage();

// Обработка навигации
window.addEventListener('popstate', async () => {
    await loadWarehousePage();
});