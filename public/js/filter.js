$(".chartview").css("display", "none");
$(".userlist").css("display", "none");
$('.filters li').click(function () {
    // $(".chartview").css("display", "block");
    // $(".userlist").css("display", "block");
    $('.filters li').removeClass('active');
    $(this).addClass('active');
    var data = $(this).attr('data-filter');
    if (data==".userlist"){
        $(".userlist").css("display", "block");
    }
    if (data==".chartview"){
        $(".chartview").css("display", "block");
    }
    $grid.isotope({
        filter: data
    })
});

if (document.getElementById("menu") || document.getElementById("gallery")) {
    var $grid = $(".grid").isotope({
        itemSelector: ".all",
        percentPosition: true,
        masonry: {
            columnWidth: ".itemlist"
        }
    })
};