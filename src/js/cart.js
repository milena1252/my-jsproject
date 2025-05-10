let cart = [];

//обновление счетчика корзины
function updateCartCounter () {
    const counter = document.querySelector ('.header__cart-counter');
    counter.textContent = cart.length;
}

const modal = document.querySelector ('.cart-modal');
const cartItemsContainer = document.querySelector ('.cart-items');
const cartTotal = document.querySelector ('.cart-total');

//открытие модального окна корзины
function openCartModal () { 
    //очищаем контейнер
    cartItemsContainer.innerHTML = '';

    //заполняем товарами
    cart.forEach (item => {
        const itemElement = document.createElement ('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
        <span class = "cart-item-name">${item.name}</span>
        <span class = "cart-item-price">${item.prise}</span>
        `;
        cartItemsContainer.append (itemElement);       
    });

    //считаем общую сумму
    const total = cart.reduce ((sum, item) => sum + parseFloat(item.prise), 0);
    cartTotal.textContent = `Итого: ${total.toFixed(2)} р.`;

    //показываем модальное окно
    modal.style.display = 'flex';
    setTimeout (() => {
        modal.classList.add ('active');
    }, 10);
}

//закрытие модального окна
function closeCartModal () {
    modal.classList.remove ('active');
    setTimeout (() => {
        modal.style.display = 'none';
    }, 300);
}

function clearCartModal() {
     if (cart.length > 0) {
        cart = [];
        document.querySelector('.header__cart-counter').textContent = '0';
        cartItemsContainer.innerHTML = '';
        cartTotal.textContent = 'Итого: 0.00 р.';
    }
}

 //инициализация корзины
 document.addEventListener ('DOMContentLoaded', () => {
    //обработчик клика на корзину в хедере
    document.querySelector ('.header__cart').addEventListener ('click', openCartModal);

    //обработчик кнопки закрытия мод.окна
    document.querySelector ('.cart-modal-close').addEventListener ('click', closeCartModal);
    document.querySelector ('.cart-modal-clear').addEventListener ('click', clearCartModal);

    //закрытие при клике вне мод.окна
    modal.addEventListener ('click', (e) => {
        if (e.target === modal) {
            closeCartModal();
        }
    });
});

 //добавление товара в корзину (выз. из product.js)
 function addToCart (product) {
    cart.push ({
        name: product.title,
        prise: product.price.toFixed(2)
    });
    updateCartCounter();
}