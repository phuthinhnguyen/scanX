$('.filters li').click(function () {
    $('.filters li').removeClass('active');
    $(this).addClass('active');
    var data = $(this).attr('data-filter');
    $grid.isotope({
        filter: data
    })
});

if (document.getElementById("menu") || document.getElementById("gallery")) {
    var $grid = $(".grid").isotope({
        itemSelector: ".all",
        percentPosition: true,
        masonry: {
            columnWidth: ".all"
        }
    })
};