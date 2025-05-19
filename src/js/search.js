document.addEventListener('DOMContentLoaded', function() {
    // 1. Находим нужные элементы
    const searchInput = document.querySelector('.header__search input');
    const searchBtn = document.querySelector('.header__search-btn');
    
    // 2. Создаем кнопку очистки
    const clearBtn = document.createElement('button');
    clearBtn.className = 'header__clear-search';
    clearBtn.innerHTML = 'X'; 
    clearBtn.style.display = 'none';
    searchInput.parentNode.appendChild(clearBtn);
  
    // 3. Функция для обновления видимости кнопок
    function updateButtons() {
      const hasText = searchInput.value.length > 0;
      searchBtn.style.display = hasText ? 'none' : 'block';
      clearBtn.style.display = hasText ? 'block' : 'none';
    }
  
    // 4. Функция для фильтрации товаров
    function filterProducts() {
      const searchText = searchInput.value.toLowerCase();
      
      document.querySelectorAll('.product').forEach(product => {
        const name = product.querySelector('.product__name').textContent.toLowerCase();
        product.style.display = name.includes(searchText) ? 'block' : 'none';
      });
    }
  
    // 5. Вешаем обработчики событий
    searchInput.addEventListener('input', function() {
      updateButtons();
      filterProducts();
    });
  
    searchBtn.addEventListener('click', filterProducts);
    
    clearBtn.addEventListener('click', function() {
      searchInput.value = '';
      updateButtons();
      document.querySelectorAll('.product').forEach(p => p.style.display = 'block');
    });
  
    // Поиск при нажатии Enter
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') filterProducts();
    });

    //меню-бургер
    const burgerBtn = document.querySelector ('.burger__btn');
    const burgerMenu = document.querySelector ('.burger__menu');

    burgerBtn.addEventListener ('click', function(){
      this.classList.toggle('active');
      burgerMenu.classList.toggle ('active');
      document.body.classList.toggle ('no-scroll');
    })
    
  });