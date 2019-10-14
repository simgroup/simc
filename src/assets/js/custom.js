$(document).ready(function () {

    $('.navbar-toggler').click(function (event) {
        event.stopPropagation();
        $('body').addClass('openMenu');
    });
    $('.toggle-btn').click(function (event) {
        event.stopPropagation();
        $('body').addClass('openProfileMenu');
    });
    $('.rightbarMenu, .left-sidebar').click(function (event) {
        event.stopPropagation();
    });
    $('.navbar-close').click(function (event) {
        event.stopPropagation();
        $('body').removeClass('openMenu');
    });
    $('body').click(function () {
        $('body').removeClass('openMenu');
    });
    $('body').click(function () {
        $('body').removeClass('openProfileMenu');
    });

    $('.houzty-slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        arrows: false,
        autoplay: true,
    });

    $('.testimonial-slider').slick({
        dots: true,
        infinite: true,
        autoplay: true,
        arrows: false,
        speed: 300,
        slidesToShow: 2,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });

    // $('.dropdown-menu').click(function (event) {
    //   event.stopPropagation();
    // });


    // $('.testimonial-slider').slick({
    //     dots: true,
    //     infinite: true,
    //     arrows: false,
    //     speed: 300,
    //     slidesToShow: 1,
    // });

    // $('.sclSlider').slick({
    //     dots: false,
    //     infinite: true,
    //     speed: 300,
    //     slidesToShow: 1,
    // });

    // $(".comment").shorten({
    //     "showChars": 500,
    //     "moreText": "View More",
    //     "lessText": "Less",
    // });

    // $('#datepicker').datepicker({
    //     uiLibrary: 'bootstrap4'
    // });



});



