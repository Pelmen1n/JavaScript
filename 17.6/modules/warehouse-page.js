import { getItems, deleteItem } from './storage.js';
import { showLoader, hideLoader } from './loader.js';
import { loadAddItemPage } from './add-item-page.js';

let currentItems = [];
let sortConfig = { key: null, direction: 'asc' };

export async function loadWarehousePage() {
    showLoader();
    
    try {
        currentItems = getItems();
        renderPage();
    } finally {
        hideLoader();
    }
}

function renderPage() {
    const content = document.getElementById('content');
    
    content.innerHTML = `
        <div class="page">
            <div class="header">
                <h1>Склад</h1>
                <a href="#" id="addItemBtn" class="btn">Добавить запись</a>
            </div>
            
            ${currentItems.length === 0 ? 
                '<p>На складе нет товаров</p>' : 
                '<div class="table-container" id="tableContainer"></div>'
            }
        </div>
    `;
    
    if (currentItems.length > 0) {
        renderTable();
    }
    
    document.getElementById('addItemBtn').addEventListener('click', async (e) => {
        e.preventDefault();
        await loadAddItemPage();
    });
}

function renderTable() {
    const tableContainer = document.getElementById('tableContainer');
    const sortedItems = [...currentItems].sort((a, b) => {
        if (!sortConfig.key) return 0;
        
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (sortConfig.direction === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });
    
    tableContainer.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th data-sort="name">Название</th>
                    <th data-sort="shelf">Полка</th>
                    <th data-sort="weight">Вес</th>
                    <th data-sort="storageTime">Время хранения</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                ${sortedItems.map(item => `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.shelf}</td>
                        <td>${item.weight} кг</td>
                        <td>${item.storageTime} дней</td>
                        <td>
                            <button class="delete-btn" data-id="${item.id}">Удалить</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    // Добавляем обработчики для сортировки
    document.querySelectorAll('th[data-sort]').forEach(th => {
        th.addEventListener('click', () => {
            const key = th.getAttribute('data-sort');
            if (sortConfig.key === key) {
                sortConfig.direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
            } else {
                sortConfig.key = key;
                sortConfig.direction = 'asc';
            }
            renderTable();
        });
    });
    
    // Добавляем обработчики для удаления
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = e.target.getAttribute('data-id');
            if (confirm('Удалить запись?')) {
                showLoader();
                try {
                    currentItems = deleteItem(id);
                    renderPage();
                } finally {
                    hideLoader();
                }
            }
        });
    });
}