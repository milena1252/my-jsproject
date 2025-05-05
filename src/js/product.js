//загрузка товаров с API
async function loadProducts() {
    const apiUrl = 'https://681891355a4b07b9d1cfc55c.mockapi.io/wb-products/products';
    try {
        //запрос к API
        const response = await fetch(apiUrl);
        //преобразуем ответ в JSON
        const products = await response.json();
        //передаем данные
        renderProducts(products);
        //обработка ошибок
    } catch (error) {
        console.error('Ошибка загрузки:', error);
    }
}

//динамическая верстка карточек для товаров
function renderProducts(products) {
    //Находим контейнер для товаров
    const productsGrid = document.querySelector('.products__grid');
    
    // Очищаем существующие карточки (если есть)
    productsGrid.innerHTML = '';
    //для каждого товара
    products.forEach(product => {
        //создаем div product
        const productElement = document.createElement('div');
        productElement.className = 'product';
        //заполняем данными для товара
        productElement.innerHTML = `
            <div class="product__image-container">
                <img src="${product.image}" alt="${product.title}" class="product__img">
                <div class="product__discount">-${product.discount}%</div>
                <button class="product__cart-btn">
                    <img src="media-products/shopping_cart.svg" alt="В корзину">
                </button>
                <button class="product__quick-view">Быстрый просмотр</button>
            </div>
            <div class="product__info">
                <div class="product__price">
                    <span class="product__price-current">${product.price.toFixed(2)} р.</span>
                    <span class="product__price-old">${product.oldPrice.toFixed(2)} р.</span>   
                </div>
                <div class="product__name">${product.title}</div>
            </div>
        `;
        //добавляем созданный элемент в контейнер
        productsGrid.appendChild(productElement);
    });
}

// Запускаем при загрузке страницы загрузку товаров
document.addEventListener('DOMContentLoaded', loadProducts);

//если API не отвечает
async function loadProducts() {
    const apiUrl = 'https://681891355a4b07b9d1cfc55c.mockapi.io/wb-products/products';
    
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        // Можно показать сообщение пользователю
        const productsGrid = document.querySelector('.products__grid');
        productsGrid.innerHTML = '<p class="error-message">Не удалось загрузить товары. Пожалуйста, попробуйте позже.</p>';
    }
}