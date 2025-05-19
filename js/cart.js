let cart = JSON.parse (localStorage.getItem('cart')) || []; //загружаем из localStorage

//обновление счетчика корзины
function updateCartCounter () {
    const counter = document.querySelector ('.header__cart-counter');
    const totalCount = cart.reduce ((sum, item) => sum + item.count, 0);
    counter.textContent = totalCount;
    localStorage.setItem ('cart', JSON.stringify (cart));//сохраняем при любом изм-ии
}

const modal = document.querySelector ('.cart-modal');
const cartItemsContainer = document.querySelector ('.cart-items');
const cartTotal = document.querySelector ('.cart-total');

//открытие модального окна корзины
function openCartModal () { 
    //очищаем контейнер
    cartItemsContainer.innerHTML = '';

    //группируем товары по имени и суммируем кол-во
    const groupedCart = cart.reduce ((acc, item) => {
        const existingItem = acc.find (i => i.name === item.name && i.price === item.price);
        if (existingItem) {
            existingItem.count += item.count;
        } else {
            acc.push ({...item});
        }
        return acc;
    }, []);

    //заполняем корзину сгруппированными товарами
    groupedCart.forEach (item => {
        const itemElement = document.createElement ('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
        <div class = "cart-item-image">
            <img src = "${item.image}" alt = "${item.name}">
        </div>
        <div class = "cart-item-details">
            <span class = "cart-item-name">${item.name}</span>
            <div class = "cart-item-meta">
                <span class = "cart-item-count">${item.count} шт.</span>
                <span class = "cart-item-price">${(item.price * item.count).toFixed (2)} р.</span>
            </div>
        </div>
        `;
        cartItemsContainer.append (itemElement);       
    });

    //считаем общую сумму
    const total = groupedCart.reduce ((sum, item) => sum + (item.price * item.count), 0);
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
        updateCartCounter ();
        cartItemsContainer.innerHTML = '';
        cartTotal.textContent = 'Итого: 0.00 р.';
    }
}

 //добавление товара в корзину (выз. из product.js)
 function addToCart (product) {
    const existingItemIndex = cart.findIndex (
        item => item.name === product.title && item.price === product.price
    );
    if (existingItemIndex >= 0) {
        //увеличиваем кол-во существующего товара
        cart[existingItemIndex].count += 1;
    } else {
        //добавляем новый товар
        cart.push ({
        name: product.title,
        price: Number(product.price.toFixed(2)),
        count: 1,
        image: product.image
    });
    }
    updateCartCounter();
}

 //инициализация корзины
 document.addEventListener ('DOMContentLoaded', () => {
    updateCartCounter ();
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