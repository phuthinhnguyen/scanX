$("#scrolltop").hide();
$("#scrolltop").click(function name(params) {
    $("html").animate({ scrollTop: 0 }, "slow");
})
window.onscroll = function () { scrolltop() };
function scrolltop() {
    if ((document.body.scrollTop > 100) || (document.documentElement.scrollTop > 100)) {
        $("#scrolltop").show();
        $("#scrolltop").addClass("scrolltop-show");
        $("nav").addClass('nav-sticky');
    }
    else {
        $("#scrolltop").hide();
        $("#scrolltop").removeClass("scrolltop-show");
        $("nav").removeClass('nav-sticky');
    };
}