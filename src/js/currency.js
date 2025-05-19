document.addEventListener ('DOMContentLoaded', function (){
     // Статичные курсы валют (1 BYN = X валюты)
     const exchangeRates = {
        'BYN': 1,
        'RUB': 28.50,
        'USD': 0.39,
        'EUR': 0.34
     };

    const currencyWrap = document.querySelector ('.header__currency-wrap');
    const currencyDropdown = document.querySelector ('.header__currency-dropdown');
    const currencyOptions = document.querySelectorAll('.header__currency-option');
    const currencyArrow = document.querySelector ('.currency-arrow');
    
    //открытие/закрытие меню при клике
    currencyWrap.addEventListener ('click', function (e) {
        e.stopPropagation();
        this.classList.toggle('active');
        currencyDropdown.classList.toggle('active');
        currencyArrow.style.transform = this.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
    });
    
    //закрытие меню при клике вне его
    document.addEventListener ('click', function() {
        currencyWrap.classList.remove ('active');
        currencyDropdown.classList.remove ('active');
        currencyArrow.style.transform = 'rotate(0)';
    });

    //Остановка всплытия события при клике внутри меню
    currencyDropdown.addEventListener ('click', function(e) {
         e.stopPropagation();
    });

     // Выбор валюты
     currencyOptions.forEach (option => {
        option.addEventListener ('click', function () {
            const currency = this.getAttribute ('data-currency');
            const flagContainer = this.querySelector('.currency-flag-container').cloneNode(true);
            const code = this.querySelector('.currency-cod').textContent;

            // Удаляем активный класс у всех опций
            currencyOptions.forEach (opt => {
                opt.classList.remove('active');
            })

            // Добавляем активный класс к выбранной опции
            this.classList.add('active');

            // Обновляем выбранную валюту
            currencyWrap.innerHTML = '';
            currencyWrap.appendChild(flagContainer);
            currencyWrap.innerHTML += `
            <span>${code}</span>
            <svg class="currency-arrow" width="12" height="12" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5H7z" fill="#fff"/>
            </svg>
            `;

            // Закрываем меню
            currencyDropdown.classList.remove('active');
            currencyWrap.classList.remove ('active');
            currencyArrow.style.transform = 'rotate(0)';

            // Здесь можно добавить логику для конвертации цен на странице
            convertPrices(currency);

        });
     });

      // Функция для конвертации цен (заглушка)
    function convertPrices(currency) {
        const rate = exchangeRates[currency];

        document.querySelectorAll('.product').forEach(product => {
            const priceElement = product.querySelector('.product__price-current');
            const oldPriceElement = product.querySelector('.product__price-old');

            // Получаем оригинальные цены из data-атрибутов
            const originalPrice = parseFloat(priceElement.getAttribute('data-price-byn'));
            const originalOldPrice =oldPriceElement ? parseFloat(oldPriceElement.getAttribute('data-price-byn')) : null;

             // Конвертируем и форматируем
             priceElement.textContent = formatPrice(originalPrice * rate, currency);
             if (oldPriceElement && originalOldPrice) {
                oldPriceElement.textContent = formatPrice(originalOldPrice * rate, currency);
             }
        })
        
        showCurrencyNotification(currency);
    }

    // Форматирование цены
    function formatPrice(price, currency) {
        const symbols = {
            'BYN': 'р.',
            'RUB': '₽',
            'USD': '$',
            'EUR': '€'
        };

        return `${price.toFixed(2)} ${symbols[currency] || currency}`;
    }

    // Функция для показа уведомления о смене валюты
    function showCurrencyNotification(currency) {
        const notification = document.createElement('div');
        notification.className = 'currency-notification';
        notification.innerHTML = `
            <span>Валюта изменена на ${currency}</span>
        `;
        document.body.appendChild(notification);
        
        // Анимация появления и исчезновения
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

});