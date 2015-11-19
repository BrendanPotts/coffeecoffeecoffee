$('.container li').click(function (event) {
    var target = $(this).attr('data-target');
    $('.content p').removeClass('show');
    $('.xbutton div').addClass('show');
    $('.content').addClass('show');
    $('#' + target).addClass('show');
 });

$('.xbutton div').click(function (event) {
    $('.content p').removeClass('show');
    $('.content').removeClass('show');
    $('.xbutton div').removeClass('show');
});

