function headerHide() {
    const header = document.querySelector(".header");
    let scrollPrev = 0;

    window.addEventListener('scroll', function () {
        let scrolled = scrollY;

        if (scrolled > 700) {
            header.classList.add('header-scroll');
        } else {
            header.classList.remove('header-scroll');
        }

        if (scrolled > 700 && scrolled < scrollPrev) {
            header.classList.add('header-top');
        } else {
            header.classList.remove('header-top');
        }
        scrollPrev = scrolled;
    });
}

if (window.innerWidth > 991) {
    headerHide();
}



gsap.fromTo('.header-contact', { x: '-100%', opacity: 0 }, { x: 0, opacity: 1, delay: 1 })

setTimeout(function () {
    document.querySelector('.promo__img').classList.add('anim');
}, 1000);





