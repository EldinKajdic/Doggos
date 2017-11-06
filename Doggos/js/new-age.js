(function($) {
    "use strict"; 

    // jQuery som förbättrar skroll på websidan
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Visar vilken länk som besöks i navbaren genom att belysa denna
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 100
    });

    // Stänger den kollapsade menyn vid klick
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset för navbar
    $('#mainNav').affix({
        offset: {
            top: 50
        }
    })

})(jQuery); 
