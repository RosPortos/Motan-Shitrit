const swiper = new Swiper(".recommend-swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    speed: 1000,
    pagination: {
        el: ".recommend .swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".recommend .swiper-button-next",
        prevEl: ".recommend .swiper-button-prev",
    },
    breakpoints: {
        991: {
            slidesPerView: 3,
        },
        300: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
    },
});