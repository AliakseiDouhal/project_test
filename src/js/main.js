$('.dropdown-toggle').dropdown();

$( function() {
    $( "#slider-range-min" ).slider({
        range: "min",
        value: 37,
        min: 1,
        max: 700,
        slide: function( event, ui ) {
            $( "#amount" ).val( "$" + ui.value );
        }
    });
    $( "#amount" ).val( "$" + $( "#slider-range-min" ).slider( "value" ) );
} );
$(document).ready(function () {
    $(".navbar-toggle").on("click", function () {
        $(this).toggleClass("active");
    });
});
