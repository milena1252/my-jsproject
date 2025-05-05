var swiper = new Swiper(".mySwiper", {
    cssMode: false,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        disabledClass: 'swiper-button-hidden'
      
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true
    },
    mousewheel: true,
    keyboard: true,
    effect: 'slide',
    speed: 600,
    grabCursor: true,
    slidesPerView: 1, 
    spaceBetween: 20, 
    watchOverflow: true, 
    preloadImages: false, 
    lazy: true
});
 