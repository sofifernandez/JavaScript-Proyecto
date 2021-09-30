//FUNCIONALES------------------------------------------------------------------------------- 
document.addEventListener('DOMContentLoaded', () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    itemsEnCarrito = JSON.parse(localStorage.getItem("itemsEnCarrito")) || [];
    hayItems();
})

// Ya hay items en el carrito?
function hayItems() {
    if (itemsEnCarrito != 0) {
        $('#lblCartCount').text(`${itemsEnCarrito}`).show();
        $('#lblCartCountDrop').text(`${itemsEnCarrito}`).show();
    }
}

//ESTETICOS---------------------------------------------------------------------------------
$(function () {
    $(document).scroll(function () {
        var $nav = $("#menuPrincipal ul");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});

$(window).resize(function () {

    if ($(window).width() <= 767) {
        $("header").toggleClass("fixed-top");
    }

    if ($(window).width() >= 768) {
        $("header").removeClass("fixed-top");
    }
})

$(document).ready(function () {

    if ($(window).width() <= 767) {
        $("header").toggleClass("fixed-top")
    }

    if ($(window).width() >= 768) {
        $("header").removeClass("fixed-top");
    }
});

