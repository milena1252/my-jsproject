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
            
            <div class="quick-view-over">   
                <div class="quick-view-content">
                    <div class="quick-view-left">
                        <img src="${product.image}" alt="${product.title}" class="quick-view-img">
                    </div>
                    <div class="quick-view-right">
                        <h3 class="quick-view-title">${product.title}</h3>
                            <div class="quick-view-prices">
                                <span class="quick-view-price">${product.price.toFixed(2)} BYN</span>
                                <span class="quick-view-old-price">${product.oldPrice.toFixed(2)} BYN</span>
                                <span class="quick-view-discount">-${product.discount}%</span>
                            </div>
                        <button class="quick-view-add-to-cart">Добавить в корзину</button>
                     </div>    
                        <button class="quick-view-close">✕</button>
                </div>
            </div>

            <div class="product__info">
                <div class="product__price">
                    <span class="product__price-current" data-price-byn="${product.price}">${product.price.toFixed(2)} р.</span>
                    <span class="product__price-old" data-price-byn"${product.oldPrice}">${product.oldPrice.toFixed(2)} р.</span>   
                </div>
                <div class="product__name">${product.title}</div>
            </div>
        `;
         //добавляем созданный элемент в контейнер
         productsGrid.appendChild(productElement);

         //обработчик для кнопки корзины (товар в корзину)
        const cartBtn = productElement.querySelector ('.product__cart-btn');
        cartBtn.addEventListener ('click', () => {
            addToCart(product);
        });

        const quickViewBtn = productElement.querySelector('.product__quick-view');
        const over = productElement.querySelector('.quick-view-over');
        const closeBtn = over.querySelector('.quick-view-close');
        const addToCartModalBtn = over.querySelector('.quick-view-add-to-cart');

        quickViewBtn.addEventListener('click', () => {
        document.body.classList.add('no-scroll');
        over.style.display = 'flex';
        setTimeout (() => {
            over.style.opacity = '1';
        }, 10)
        });

        closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        document.body.classList.remove('no-scroll');
        over.style.display = 'none';
        });

        over.addEventListener('click', (e) => {
            if (e.target === over) {
                document.body.classList.remove('no-scroll');
                over.style.display = 'none';
            } 
        });

         addToCartModalBtn.addEventListener('click', () => {
            addToCart(product);
            document.body.classList.remove('no-scroll');
            over.style.display = 'none';
        });
       
    });
}

// Запускаем при загрузке страницы загрузку товаров
document.addEventListener('DOMContentLoaded', loadProducts);



