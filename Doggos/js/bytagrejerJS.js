// Byter bild på 'om oss' delen
$(document).ready(function(){ 
    $("#leftPic").click(function(){
        $(".cta").fadeOut(1200, function(){
            $(".cta2").fadeIn(1000);
        });
    });
});

// Byter tillbaka bild på 'om oss' delen
$(document).ready(function(){
    $("#rightPic").click(function(){
        $(".cta2").fadeOut(1200, function(){
            $(".cta").fadeIn(500);
        });
    });
});

// Öppnar hund-tass-kontakt funktionen vid click
$(document).ready(function () {
    $('.material-button-toggle').click(function () {
        $(this).toggleClass('open');
        $('.option').toggleClass('scale-on');
    });
});

// Skapar scroll-affect funktionen för hund-tass-kontakt funktionen
function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

// Öppnar och stänger hund-tass-kontakt funktionen vid scroll in och ut från kontaktformuläret
$(window).scroll(function() {    
    if(isScrolledIntoView($('#contact2')))
    {
        $('.material-button-toggle').addClass('open');
        $('.option').addClass('scale-on');
    }
    else {
                $('.material-button-toggle').removeClass('open');
        $('.option').removeClass('scale-on');
    }
});
