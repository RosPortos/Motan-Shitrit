$('.page-demo__list a').on('click', function (e) {
    e.preventDefault();

    let href = $(this).attr('href');


    $('.page-demo iframe').attr('src', href)


});

