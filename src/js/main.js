$('.dropdown-toggle').dropdown();

$(function() {
    var range = $('.input-range'),
        value = $('.range-value');
    console.log(value.html(range.attr('value')));
    value.html(range.attr('value'));
    range.on('input', function(){
        value.html(this.value);
    });
});
$(document).ready(function () {
    $(".navbar-toggle").on("click", function () {
        $(this).toggleClass("active");
    });
});
