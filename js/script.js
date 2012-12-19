(function ($) {

    // init function
    if($('.menu__item').length > 0) {
        onePageNav();
    }

    goTop();

})(this.jQuery);

function onePageNav() {

    // Cache selectors
    var menuItems = $('.menu__item'),
        scrollItems = menuItems.map(function () {
            var item = $($(this).attr('href'));
            return item;
        });

    // add active class to first element
    menuItems.eq(0).addClass('menu__item_active');

    // animate scroll when click menu item
    menuItems.click(function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        $('html,body').stop().animate({
            scrollTop: $(href).offset().top + 1
        }, 300);
    });

    // bind to scroll
    $(window).scroll(function () {

        // get container scroll position
        var fromTop = $(this).scrollTop() + 1;

        // get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });

        // get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : '';

        // Set/remove active class
        menuItems.removeClass('menu__item_active').filter('[href=#' + id + ']').addClass('menu__item_active');
    });
}

function goTop() {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
            $('.go-top').fadeIn();
        } else {
            $('.go-top').fadeOut();
        }
    });
    $('.go-top').click(function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop:0
        }, 300);
    });
}