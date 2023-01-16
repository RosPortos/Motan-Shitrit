$('.page-demo__list a').on('click', function (e) {

    e.preventDefault();
    let href = $(this).attr('href');
    $('.page-demo iframe').attr('src', href)




});


function headerHide() {
    const header = document.querySelector(".header");
    const headerScroll = document.querySelector(".header-scroll");
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

