// Init
var $ = jQuery;
var animationTime = 20,
    days = 7;
 
$(document).ready(function(){

    // timer arguments: 
    //   #1 - time of animation in mileseconds, 
    //   #2 - days to deadline

    $('#progress-time-fill, #death-group').css({'animation-duration': animationTime+'s'});

    var deadlineAnimation = function () {
        setTimeout(function(){
            $('#designer-arm-grop').css({'animation-duration': '1.5s'});
        },0);

        setTimeout(function(){
            $('#designer-arm-grop').css({'animation-duration': '1s'});
        },4000);

        setTimeout(function(){
            $('#designer-arm-grop').css({'animation-duration': '0.7s'});
        },8000);

        setTimeout(function(){
            $('#designer-arm-grop').css({'animation-duration': '0.3s'});
        },12000);

        setTimeout(function(){
            $('#designer-arm-grop').css({'animation-duration': '0.2s'});
        },15000);
    };

function timer() {
    var dots = [".", "..", "..."];
    var index = 0;
    setInterval(function() {
        $('.deadline-days .day').text(dots[index]);
        index = (index + 1) % dots.length;
    }, 500);
}

    var deadlineText = function () {
        var $el = $('.deadline-days');
        var html = '<div class="mask-red"><div class="inner">' + $el.html() + '</div></div><div class="mask-white"><div class="inner">' + $el.html() + '</div></div>';
        $el.html(html);
    }

    deadlineText();

    deadlineAnimation();
    timer();

    setInterval(function(){
        timer();
        deadlineAnimation();

        console.log('begin interval', animationTime * 1000);

    }, animationTime * 1000);

});
